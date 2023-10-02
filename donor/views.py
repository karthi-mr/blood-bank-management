from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet

from app.pagination import CustomPagination

from .models import BloodDonate, Donor
from .permissions import (BloodDonateHistoryPermission, BloodDonatePermission,
                          BloodDonateUpdatePermission, DonorPermission)
from .serializers import BloodDonateSerializer, DonorSerializer


class DonorViewSet(ModelViewSet):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer
    permission_classes = [DonorPermission]
    pagination_class = CustomPagination

    def list(self, request):
        queryset = self.get_queryset()
        donorSerializer = DonorSerializer(queryset, many=True)
        page = self.paginate_queryset(donorSerializer.data)
        return self.get_paginated_response(page)


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
        serializer = BloodDonateSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid(raise_exception=True):
            serializer.save()

        return Response({'detail': "Donate request created successfully."}, 
                        status=status.HTTP_201_CREATED)


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


class BloodDonateHistoryViewSet(ViewSet):
    permission_classes = [BloodDonateHistoryPermission]

    def list(self, request, *args, **kwargs):
        queryset = BloodDonate.objects.all()
        if request.user.user_type == 2:
            donor = Donor.objects.get(user=request.user)
            queryset = BloodDonate.objects.filter(Q(donor=donor)).exclude(status=2)
            serializer = BloodDonateSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.user.user_type == 1:
            queryset = BloodDonate.objects.exclude(status=2)
            serializer = BloodDonateSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': "Unknown error occurred in server."}, 
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    