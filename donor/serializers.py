from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.validators import ValidationError

from .models import Donor
from auth.models import User
from auth.serializers import UserSerializer


class DonorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Donor
        fields = '__all__'

    def create(self, validated_data):
        """ creating user """
        user_data = validated_data.pop('user')
        if user_data.get('user_type') != 2:
            raise ValidationError("You have entered wrong user type.")
        user_data['password'] = make_password(user_data.get('password'))
        user = User.objects.create(**user_data)

        """ creating donor """
        validated_data['user'] = user
        instance = Donor.objects.create(**validated_data);
        
        return instance