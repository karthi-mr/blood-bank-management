from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.validators import ValidationError
from rest_framework.permissions import IsAuthenticated

from donor.models import Donor
from patient.models import Patient
from app.pagination import CustomPagination

from .models import BloodGroup, BloodRequest, Stock
from .filters import SortBloodRequestHistoryFilter
from .permissions import (BloodGroupPermission, BloodRequestPermission,
                          StockPermission, UpdateStockPermission, BloodRequestUpdatePermission)
from .serializers import (BloodGroupSerializer, BloodRequestSerializer,
                          StockSerializer)


class BloodGroupViewSet(GenericViewSet):
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


class StockViewSet(GenericViewSet):
    permission_classes = [StockPermission]

    def list(self, request, *args, **kwargs):
        queryset = Stock.objects.all(). \
                    order_by("blood_group__blood_group")
        serializer = StockSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['PATCH'], permission_classes=[UpdateStockPermission])
    def update_stock(self, request):
        blood_group = request.data.get('blood_group')
        unit = request.data.get('unit')
        try:
            queryset = get_object_or_404(Stock, blood_group=blood_group)
            if queryset.unit + unit < 0:
                return Response({'detail': "No unit available."},
                                status=status.HTTP_400_BAD_REQUEST)
            queryset.unit += unit
            queryset.save()
            return Response({'detail': "Stock updated successfully."}, status=status.HTTP_200_OK)
        except Exception:
            return Response({'detail': "An Unknown error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['POST'], permission_classes=[])
    def unit_available(self, request):
        blood_group = request.data.get('blood_group')
        unit = request.data.get('unit')
        try:
            queryset = get_object_or_404(Stock, blood_group=blood_group)
            if queryset.unit + unit < 0:
                return Response({'unit_available': False},
                                status=status.HTTP_200_OK)
            return Response({'unit_available': True},
                            status=status.HTTP_200_OK)
        except Exception:
            return Response({'detail': "An Unknown error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BloodRequestViewSet(GenericViewSet):
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

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def total_request(self, request):
        if request.user.user_type == 2:
            donor = Donor.objects.get(user=request.user)
            queryset = BloodRequest.objects.filter(request_by_donor=donor)
        elif request.user.user_type == 3:
            patient = Patient.objects.get(user=request.user)
            queryset = BloodRequest.objects.filter(request_by_patient=patient)
        else:
            queryset = BloodRequest.objects.all()
        # print(len(queryset))
        return Response({'total_request': len(queryset)})

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def total_request_approved(self, request):
        if request.user.user_type == 2:
            donor = Donor.objects.get(user=request.user)
            queryset = BloodRequest.objects.filter \
                        (Q(request_by_donor=donor) & Q(status=1))
        elif request.user.user_type == 3:
            patient = Patient.objects.get(user=request.user)
            queryset = BloodRequest.objects.filter \
                        (Q(request_by_patient=patient) & Q(status=1))
        else:
            queryset = BloodRequest.objects.filter(status=1)
        # print(len(queryset))
        return Response({'total_request': len(queryset)})

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def total_request_pending(self, request):
        if request.user.user_type == 2:
            donor = Donor.objects.get(user=request.user)
            queryset = BloodRequest.objects.filter \
                        (Q(request_by_donor=donor) & Q(status=2))
        elif request.user.user_type == 3:
            patient = Patient.objects.get(user=request.user)
            queryset = BloodRequest.objects.filter \
                        (Q(request_by_patient=patient) & Q(status=2))
        else:
            queryset = BloodRequest.objects.filter(status=2)
        # print(len(queryset))
        return Response({'total_request': len(queryset)})

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def total_request_rejected(self, request):
        if request.user.user_type == 2:
            donor = Donor.objects.get(user=request.user)
            queryset = BloodRequest.objects.filter \
                        (Q(request_by_donor=donor) & Q(status=3))
        elif request.user.user_type == 3:
            patient = Patient.objects.get(user=request.user)
            queryset = BloodRequest.objects.filter \
                        (Q(request_by_patient=patient) & Q(status=3))
        else:
            queryset = BloodRequest.objects.filter(status=3)
        # print(len(queryset))
        return Response({'total_request': len(queryset)})


class BloodRequestHistoryViewSet(GenericViewSet):
    permission_classes = [BloodRequestPermission]
    pagination_class = CustomPagination
    filter_backends = [SortBloodRequestHistoryFilter]

    def list(self, request, *args, **kwargs):
        if request.user.user_type == 2:
            donor = get_object_or_404(Donor, user=request.user)
            queryset = self.filter_queryset(BloodRequest.objects.filter(
                request_by_donor=donor).exclude(status=2))
            serializer = BloodRequestSerializer(queryset, many=True)
            page = self.paginate_queryset(serializer.data)
            return self.get_paginated_response(page)

        elif request.user.user_type == 3:
            patient = get_object_or_404(Patient, user=request.user)
            queryset = self.filter_queryset(BloodRequest.objects.filter(
                request_by_patient=patient).exclude(status=2))
            serializer = BloodRequestSerializer(queryset, many=True)
            page = self.paginate_queryset(serializer.data)
            return self.get_paginated_response(page)

        elif request.user.user_type == 1:
            queryset = self.filter_queryset(BloodRequest.objects.exclude(status=2))
            serializer = BloodRequestSerializer(queryset, many=True)
            page = self.paginate_queryset(serializer.data)
            return self.get_paginated_response(page)
    