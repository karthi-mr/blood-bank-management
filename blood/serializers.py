from rest_framework import serializers
from rest_framework.validators import ValidationError

from auth.serializers import UserSerializer
from donor.models import Donor
from patient.models import Patient

from .models import BloodDonate, BloodGroup, BloodRequest, Stock


class BloodGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = BloodGroup
        fields = '__all__'


class StockSerializer1(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = '__all__'


class StockSerializer(serializers.ModelSerializer):
    blood_group = BloodGroupSerializer()

    class Meta:
        model = Stock
        fields = '__all__'


class SimpleDonorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    blood_group = BloodGroupSerializer(read_only=True)
    blood_group_id = serializers.SlugRelatedField(queryset=BloodGroup.objects.all(),
                                                  slug_field='id',
                                                  write_only=True)

    class Meta:
        model = Donor
        fields = '__all__'


class SimplePatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    blood_group = BloodGroupSerializer(read_only=True)

    class Meta:
        model = Patient
        fields = '__all__'


class BloodRequestSerializer(serializers.ModelSerializer):
    blood_group = BloodGroupSerializer(read_only=True)
    blood_group_id = serializers.SlugRelatedField(queryset=BloodGroup.objects.all(),
                                                  slug_field='id',
                                                  write_only=True)
    request_by_donor = SimpleDonorSerializer(read_only=True)
    request_by_patient = SimplePatientSerializer(read_only=True)

    class Meta:
        model = BloodRequest
        fields = '__all__'
        read_only_fields = ('request_by_donor', 'request_by_patient')

    def create(self, validated_data):
        validated_data['request_by_donor'] = self.context.get('donor')
        validated_data['request_by_patient'] = self.context.get('patient')
        validated_data['blood_group'] = validated_data.pop('blood_group_id')

        instance = BloodRequest.objects.create(**validated_data)

        return instance


class BloodDonateSerializer(serializers.ModelSerializer):
    donor = SimpleDonorSerializer(read_only=True)
    blood_group = BloodGroupSerializer(read_only=True)
    blood_group_id = serializers.SlugRelatedField(queryset=BloodGroup.objects.all(),
                                                  slug_field='id',
                                                  write_only=True)

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
        # validated_data['donor'] = donor

        instance = BloodDonate.objects.create(donor=donor,
                                              disease=validated_data.get(
                                                  'disease')
                                              or "Nothing",
                                              age=validated_data.get('age'),
                                              unit=validated_data.get('unit'),
                                              blood_group=validated_data.get('blood_group_id'))

        return instance
