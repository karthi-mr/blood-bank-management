from rest_framework import serializers

from .models import BloodGroup, Stock


class StockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = '__all__'


class BloodGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = BloodGroup
        fields = '__all__'