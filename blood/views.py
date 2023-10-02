from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from donor.models import Donor
from patient.models import Patient

from .models import BloodGroup, BloodRequest, Stock
from .permissions import (BloodGroupPermission, BloodRequestPermission,
                          StockPermission, UpdateStockPermission, BloodRequestUpdatePermission)
from .serializers import (BloodGroupSerializer, BloodRequestSerializer,
                          StockSerializer)


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


class BloodRequestViewSet(ViewSet):
    permission_classes = [BloodRequestPermission]

    def list(self, request, *args, **kwargs):
        if request.user.user_type == 2:
            donor = get_object_or_404(Donor, user=request.user)
            queryset = BloodRequest.objects.filter(
                Q(request_by_donor=donor) & Q(status=2))
            serializer = BloodRequestSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.user.user_type == 3:
            patient = get_object_or_404(Patient, user=request.user)
            queryset = BloodRequest.objects.filter(
                Q(request_by_patient=patient) & Q(status=2))
            serializer = BloodRequestSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.user.user_type == 1:
            queryset = BloodRequest.objects.filter(status=2)
            serializer = BloodRequestSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        if request.user.user_type == 2:
            donor = get_object_or_404(Donor, user=request.user)
            serializer = BloodRequestSerializer(data=request.data,
                                                context={'donor': donor})
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({'detail': "Blood requested successfully."}, status=status.HTTP_200_OK)
            return Response({'detail': "An Unknown error occurred.", 'error': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        elif request.user.user_type == 3:
            patient = get_object_or_404(Patient, user=request.user)
            serializer = BloodRequestSerializer(data=request.data,
                                                context={'patient': patient})
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({'detail': "Blood requested successfully."}, status=status.HTTP_200_OK)
            return Response({'detail': "An Unknown error occurred.", 'error': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'detail': "An Unknown error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['PATCH'], permission_classes=[BloodRequestUpdatePermission])
    def update_status(self, request, *args, **kwargs):
        id = request.data.get('id')
        status_update = request.data.get('status')
        queryset = get_object_or_404(BloodRequest, id=id)
        try:
            queryset.status = status_update
            queryset.save()
            return Response({'detail': "Status updated successfully."},
                            status=status.HTTP_200_OK)
        except Exception:
            return Response({'detail': "An Unknown error occurred."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BloodRequestHistoryViewSet(ViewSet):
    permission_classes = [BloodRequestPermission]

    def list(self, request, *args, **kwargs):
        if request.user.user_type == 2:
            donor = get_object_or_404(Donor, user=request.user)
            queryset = BloodRequest.objects.filter(
                request_by_donor=donor).exclude(status=2)
            serializer = BloodRequestSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.user.user_type == 3:
            patient = get_object_or_404(Patient, user=request.user)
            queryset = BloodRequest.objects.filter(
                request_by_patient=patient).exclude(status=2)
            serializer = BloodRequestSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.user.user_type == 1:
            queryset = BloodRequest.objects.exclude(status=2)
            serializer = BloodRequestSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
