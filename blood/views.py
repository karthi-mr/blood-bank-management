from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from app.pagination import CustomPagination
from donor.models import Donor
from patient.models import Patient

from .filters import (BloodDonateSearchFilter, BloodRequestSearchFilter,
                      SortBloodDonateHistoryFilter,
                      SortBloodRequestHistoryFilter)
from .models import BloodDonate, BloodGroup, BloodRequest, Stock
from .permissions import (BloodDonateHistoryPermission, BloodDonatePermission,
                          BloodDonateUpdatePermission, BloodGroupPermission,
                          BloodRequestPermission, BloodRequestUpdatePermission,
                          StockPermission, UpdateStockPermission)
from .serializers import (BloodDonateSerializer, BloodGroupSerializer,
                          BloodRequestSerializer, StockSerializer)


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

    def retrieve(self, request, pk=None):
        queryset = get_object_or_404(BloodRequest, pk=pk)
        serializer = BloodRequestSerializer(queryset)
        return Response({'result': serializer.data}, status=status.HTTP_200_OK)

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

    @action(detail=False, methods=['PATCH'], permission_classes=[BloodRequestUpdatePermission])
    def update_reason(self, request, *args, **kwargs):
        id = request.data.get('id')
        reason_update = request.data.get('reject_reason')
        queryset = get_object_or_404(BloodRequest, id=id)
        try:
            queryset.reject_reason = reason_update
            queryset.save()
            return Response({'detail': "Reject reason updated successfully."},
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
        return Response({'total_request': len(queryset)})

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def total_request_approved(self, request):
        if request.user.user_type == 2:
            donor = Donor.objects.get(user=request.user)
            queryset = BloodRequest.objects.filter(
                Q(request_by_donor=donor) & Q(status=1))
        elif request.user.user_type == 3:
            patient = Patient.objects.get(user=request.user)
            queryset = BloodRequest.objects.filter(
                Q(request_by_patient=patient) & Q(status=1))
        else:
            queryset = BloodRequest.objects.filter(status=1)
        return Response({'total_request': len(queryset)})

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def total_request_pending(self, request):
        if request.user.user_type == 2:
            donor = Donor.objects.get(user=request.user)
            queryset = BloodRequest.objects.filter(
                Q(request_by_donor=donor) & Q(status=2))
        elif request.user.user_type == 3:
            patient = Patient.objects.get(user=request.user)
            queryset = BloodRequest.objects.filter(
                Q(request_by_patient=patient) & Q(status=2))
        else:
            queryset = BloodRequest.objects.filter(status=2)
        return Response({'total_request': len(queryset)})

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def total_request_rejected(self, request):
        if request.user.user_type == 2:
            donor = Donor.objects.get(user=request.user)
            queryset = BloodRequest.objects.filter(
                Q(request_by_donor=donor) & Q(status=3))
        elif request.user.user_type == 3:
            patient = Patient.objects.get(user=request.user)
            queryset = BloodRequest.objects.filter(
                Q(request_by_patient=patient) & Q(status=3))
        else:
            queryset = BloodRequest.objects.filter(status=3)
        return Response({'total_request': len(queryset)})


class BloodRequestHistoryViewSet(GenericViewSet):
    permission_classes = [BloodRequestPermission]
    pagination_class = CustomPagination
    filter_backends = [SortBloodRequestHistoryFilter, BloodRequestSearchFilter]

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
            queryset = self.filter_queryset(
                BloodRequest.objects.exclude(status=2))
            serializer = BloodRequestSerializer(queryset, many=True)
            page = self.paginate_queryset(serializer.data)
            return self.get_paginated_response(page)

    def retrieve(self, request, pk=None):
        queryset = get_object_or_404(BloodRequest, pk=pk)
        serializer = BloodRequestSerializer(queryset)
        return Response({'result': serializer.data}, status=status.HTTP_200_OK)


class BloodDonateViewSet(ModelViewSet):
    queryset = BloodDonate.objects.all()
    serializer_class = BloodDonateSerializer
    permission_classes = [BloodDonatePermission]

    def list(self, request, *args, **kwargs):
        if request.user.user_type == 2:
            donor = Donor.objects.get(user=request.user)
            queryset = BloodDonate.objects.filter(Q(donor=donor) & Q(status=2))
            serializer = BloodDonateSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.user.user_type == 1:
            queryset = BloodDonate.objects.filter(Q(status=2))
            serializer = BloodDonateSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': "Unknown error occurred in server."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request, *args, **kwargs):
        serializer = BloodDonateSerializer(
            data=request.data, context={'user': request.user})
        if serializer.is_valid(raise_exception=True):
            serializer.save()

        return Response({'detail': "Donate request created successfully."},
                        status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        queryset = get_object_or_404(BloodDonate, pk=pk)
        serializer = BloodDonateSerializer(queryset)
        return Response({'result': serializer.data}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['PATCH'], permission_classes=[BloodDonateUpdatePermission])
    def update_status(self, request):
        id = request.data.get('id')
        status_update = request.data.get('status')
        queryset = get_object_or_404(BloodDonate, id=id)
        try:
            queryset.status = status_update
            queryset.save()
            return Response({'detail': "Status updated successfully."},
                            status=status.HTTP_200_OK)
        except Exception:
            return Response({'detail': "An Unknown error occurred."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['PATCH'], permission_classes=[BloodDonateUpdatePermission])
    def update_reason(self, request):
        id = request.data.get('id')
        reason_update = request.data.get('reject_reason')
        queryset = get_object_or_404(BloodDonate, id=id)
        try:
            queryset.reject_reason = reason_update
            queryset.save()
            return Response({'detail': "Reject reason updated successfully."},
                            status=status.HTTP_200_OK)
        except Exception:
            return Response({'detail': "An Unknown error occurred."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['GET'], permission_classes=[BloodDonatePermission])
    def total_donate(self, request):
        if request.user.user_type == 2:
            donor = Donor.objects.get(user=request.user)
            queryset = BloodDonate.objects.filter(donor=donor)
        else:
            queryset = BloodDonate.objects.all()
        return Response({'total_donate': len(queryset)})

    @action(detail=False, methods=['GET'], permission_classes=[BloodDonatePermission])
    def total_donate_approved(self, request):
        if request.user.user_type == 2:
            donor = Donor.objects.get(user=request.user)
            queryset = BloodDonate.objects.filter(Q(donor=donor) & Q(status=1))
        else:
            queryset = BloodDonate.objects.filter(status=1)
        return Response({'total_donate': len(queryset)})

    @action(detail=False, methods=['GET'], permission_classes=[BloodDonatePermission])
    def total_donate_pending(self, request):
        if request.user.user_type == 2:
            donor = Donor.objects.get(user=request.user)
            queryset = BloodDonate.objects.filter(Q(donor=donor) & Q(status=2))
        else:
            queryset = BloodDonate.objects.filter(status=2)
        return Response({'total_donate': len(queryset)})

    @action(detail=False, methods=['GET'], permission_classes=[BloodDonatePermission])
    def total_donate_rejected(self, request):
        if request.user.user_type == 2:
            donor = Donor.objects.get(user=request.user)
            queryset = BloodDonate.objects.filter(Q(donor=donor) & Q(status=3))
        else:
            queryset = BloodDonate.objects.filter(status=3)
        return Response({'total_donate': len(queryset)})


class BloodDonateHistoryViewSet(GenericViewSet):
    permission_classes = [BloodDonateHistoryPermission]
    pagination_class = CustomPagination
    filter_backends = [SortBloodDonateHistoryFilter, BloodDonateSearchFilter]

    def list(self, request, *args, **kwargs):
        queryset = BloodDonate.objects.all()
        if request.user.user_type == 2:
            donor = Donor.objects.get(user=request.user)
            queryset = self.filter_queryset(BloodDonate.objects.filter(
                Q(donor=donor)).exclude(status=2))
            serializer = BloodDonateSerializer(queryset, many=True)
            page = self.paginate_queryset(serializer.data)
            return self.get_paginated_response(page)
        elif request.user.user_type == 1:
            queryset = self.filter_queryset(
                BloodDonate.objects.exclude(status=2))
            serializer = BloodDonateSerializer(queryset, many=True)
            page = self.paginate_queryset(serializer.data)
            return self.get_paginated_response(page)
        return Response({'detail': "Unknown error occurred in server."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def retrieve(self, request, pk=None):
        queryset = get_object_or_404(BloodDonate, pk=pk)
        serializer = BloodDonateSerializer(queryset)
        return Response({'result': serializer.data}, status=status.HTTP_200_OK)
