from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.validators import ValidationError

from .models import Patient
from auth.models import User
from auth.serializers import UserSerializer


class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Patient
        fields = '__all__'

    def create(self, validated_data):
        """ creating user """
        user_data = validated_data.pop('user')
        if user_data.get('user_type') != 3:
            raise ValidationError("You have entered wrong user type.")
        user_data['password'] = make_password(user_data.get('password'))
        user = User.objects.create(**user_data)

        """ creating donor """
        validated_data['user'] = user
        instance = Patient.objects.create(**validated_data);
        
        return instance