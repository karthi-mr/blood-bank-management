from datetime import date

from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.validators import ValidationError

from auth.serializers import UserSerializer

from .models import BloodDonate, Donor


class DonorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Donor
        fields = '__all__'

    def create(self, validated_data):
        """ creating user """
        user_data = validated_data.pop('user')
        user_data['password'] = make_password(user_data.get('password'))
        userSerializer = UserSerializer(data=user_data, context={'user_type': 2})
        if userSerializer.is_valid(raise_exception=True):
            user = userSerializer.save()

        """ creating donor """
        validated_data['user'] = user
        instance = Donor.objects.create(**validated_data)
        
        return instance


class BloodDonateSerializer(serializers.ModelSerializer):
    # donor = DonorSerializer(read_only=True)
    
    class Meta:
        model = BloodDonate
        fields = '__all__'
        read_only_fields = ('status', 'donor')

    def validate_age(self, attrs):
        if attrs < 12:
            raise ValidationError("Below age 12 should not give blood")
        return attrs

    def validate_unit(self, attrs):
        if attrs > 2:
            raise ValidationError("Unit should not be greater than 2.")
        return attrs

    def create(self, validated_data):
        user = self.context.get('user')
        donor = Donor.objects.get(user=user)
        validated_data['donor'] = donor
        instance = BloodDonate.objects.create(**validated_data)

        return instance
        