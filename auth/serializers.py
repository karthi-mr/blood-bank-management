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
    # password = serializers.CharField(write_only=True)
    # user_type = serializers.IntegerField(read_only = True)

    def validate_mobile(self, attrs):
        if User.objects.filter(mobile=attrs) and self.parent and self.parent.instance == None:
            raise ValidationError("MOBILE_ALREADY_PRESENT")
        if not attrs.isdigit():
            raise ValidationError("OTHER_THAN_NUMBER")
        if len(attrs) != 10:
            raise ValidationError("LENGTH_NOT_TEN")
        return attrs

    def validate_username(self, attrs):
        if User.objects.filter(username__iexact=attrs) and self.parent and self.parent.instance == None:
            raise ValidationError("USERNAME_ALREADY_PRESENT")
        return attrs

    def validate_email(self, attrs):
        if User.objects.filter(email__iexact=attrs) and self.parent and self.parent.instance == None:
            raise ValidationError("EMAIL_ALREADY_PRESENT")
        return attrs.lower()

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email',
                  'mobile', 'user_type', 'address', 'password', 'last_login')
        read_only_fields = ('last_login', 'user_type')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['user_type'] = self.context.get('user_type')
        user_instance = User.objects.create(**validated_data)

        return user_instance

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
