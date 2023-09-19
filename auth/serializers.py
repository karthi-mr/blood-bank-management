from rest_framework import serializers
from rest_framework.validators import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        token['username'] = user.username  # Add custom claims
        token['user_type'] = user.user_type
        return token


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    user_type = serializers.IntegerField(read_only = True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email',
                  'mobile', 'user_type', 'address', 'password']
        