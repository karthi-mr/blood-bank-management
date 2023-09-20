from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from .models import BloodGroup, Stock
from .permissions import (BloodGroupPermission, StockPermission,
                          UpdateStockPermission)
from .serializers import BloodGroupSerializer, StockSerializer


class BloodGroupViewSet(ViewSet):
    permission_classes = [BloodGroupPermission]

    def list(self, request, *args, **kwargs):
        queryset = BloodGroup.objects.all()
        serializer = BloodGroupSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = BloodGroupSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'detail': "Blood Group added Successfully"},
                            status=status.HTTP_201_CREATED)
        return Response({'detail': "An Unknown error occurred"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class StockViewSet(ViewSet):
    permission_classes = [StockPermission]

    def list(self, request, *args, **kwargs):
        queryset = Stock.objects.all()
        serializer = StockSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['PATCH'], permission_classes=[UpdateStockPermission])
    def update_stock(self, request):
        blood_group = request.data.get('blood_group')
        unit = request.data.get('unit')
        try:
            queryset = get_object_or_404(Stock, blood_group=blood_group)
            queryset.unit += unit
            queryset.save()
            return Response({'detail': "Stock updated successfully."}, status=status.HTTP_200_OK)
        except Exception:
            return Response({'detail': "An Unknown error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
