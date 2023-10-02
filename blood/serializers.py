from rest_framework import serializers

from .models import BloodGroup, BloodRequest, Stock


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


class BloodRequestSerializer(serializers.ModelSerializer):
    blood_group = BloodGroupSerializer(read_only=True)
    blood_group_id = serializers.SlugRelatedField(queryset=BloodGroup.objects.all(),
                                                  slug_field='id',
                                                  write_only=True)

    class Meta:
        model = BloodRequest
        fields = '__all__'
        read_only_fields = ('request_by_donor', 'request_by_patient')

    def create(self, validated_data):
        validated_data['request_by_donor'] = self.context.get('donor')
        validated_data['request_by_patient'] = self.context.get('patient')
        validated_data['blood_group'] = validated_data.pop('blood_group_id')
        print(validated_data)

        instance = BloodRequest.objects.create(**validated_data)

        return instance
