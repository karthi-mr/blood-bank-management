from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.validators import ValidationError

from auth.models import User
from auth.serializers import UserSerializer

from .models import Donor


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