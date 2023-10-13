from datetime import date

from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.validators import ValidationError

from auth.serializers import UserSerializer
from blood.models import BloodGroup
from blood.serializers import BloodGroupSerializer

from .models import Donor


class DonorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    blood_group = BloodGroupSerializer(read_only=True)
    blood_group_id = serializers.SlugRelatedField(queryset=BloodGroup.objects.all(),
                                                  slug_field='id',
                                                  write_only=True)

    def validate_date_of_birth(self, attrs):
        if date.today() < attrs:
            raise ValidationError("INVALID_DOB")
        return attrs

    class Meta:
        model = Donor
        fields = '__all__'

    def create(self, validated_data):
        """ creating user """
        user_data = validated_data.pop('user')
        user_data['password'] = make_password(user_data.get('password'))
        userSerializer = UserSerializer(
            data=user_data, context={'user_type': 2})
        if userSerializer.is_valid(raise_exception=True):
            user = userSerializer.save()

        """ creating donor """
        self.validate_date_of_birth(validated_data['date_of_birth'])
        validated_data['user'] = user
        validated_data['blood_group'] = validated_data.pop('blood_group_id')
        instance = Donor.objects.create(**validated_data)

        return instance

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')

        userSerializer = UserSerializer(
            instance=instance.user, data=user_data, partial=True)

        if userSerializer.is_valid(raise_exception=True):
            userSerializer.save()

        instance.date_of_birth = validated_data.get('date_of_birth')
        instance.save()

        return instance
