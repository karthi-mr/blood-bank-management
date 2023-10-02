from rest_framework import serializers

from .models import BloodGroup, Stock, BloodRequest


class StockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = '__all__'


class BloodGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = BloodGroup
        fields = '__all__'


class BloodRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = BloodRequest
        fields = '__all__'
        read_only_fields = ('request_by_donor', 'request_by_patient')

    def create(self, validated_data):
        validated_data['request_by_donor'] = self.context.get('donor')
        validated_data['request_by_patient'] = self.context.get('patient')
        print(validated_data)

        instance = BloodRequest.objects.create(**validated_data)

        return instance