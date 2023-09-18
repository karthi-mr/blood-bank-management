from rest_framework import serializers
from rest_framework.validators import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        token['username'] = user.username  # Add custom claims
        return token


# class RegisterSerializer(serializers.ModelSerializer):
#     password1 = serializers.CharField()

#     class Meta:
#         model = User
#         fields = '__all__'

#     def validate(self, attrs):
#         if attrs['password'] != attrs['password1']:
#             raise serializers.ValidationError({'password': "PASSWORD_NOT_MATCH"})
#         return attrs

#     def validate_mobile(self, attrs):
#         if len(attrs) != 10:
#             raise ValidationError("Mobile number must contain 10 digits.")
#         if not attrs.isdigit():
#             raise ValidationError("Mobile number must contain digits only.")
#         return attrs

#     def validate_username(self, attrs):
#         if User.objects.filter(username__iexact=attrs):
#             raise ValidationError("A user with that username already exists")
#         return attrs

#     def validate_email(self, attrs):
#         if User.objects.filter(email__iexact=attrs):
#             raise ValidationError("user with this email already exists.")
#         return attrs.lower()

#     def create(self, validated_data):
#         validated_data.pop('password1')
#         instance = User.objects.create(username = validated_data.get('username'),
#                                        first_name = validated_data.get('first_name'),
#                                        last_name = validated_data.get('last_name'),
#                                        password = make_password(validated_data.get('password')),
#                                        email = validated_data.get('email'),
#                                        is_active = True,
#                                        mobile = validated_data.get('mobile'),
#                                        profile = validated_data.get('profile'),
#                                       )
       
#         return instance


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email',
                  'mobile', 'user_type', 'address', 'password']
        