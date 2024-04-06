from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from app.pagination import CustomPagination
from donor.filters import DonorSearchFilter, SortFilter
from donor.models import Donor
from donor.permissions import DonorPermission, TotalDonorPermission
from donor.serializers import DonorSerializer


class DonorViewSet(ModelViewSet):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer
    permission_classes = [DonorPermission]
    pagination_class = CustomPagination
    filter_backends = [SortFilter, DonorSearchFilter]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        donorSerializer = DonorSerializer(queryset, many=True)
        page = self.paginate_queryset(donorSerializer.data)
        return self.get_paginated_response(page)

    def create(self, request, *args, **kwargs) -> Response:
        serializer = DonorSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': "Donor Registered Successfully."}, status=status.HTTP_201_CREATED)
        return Response({'message': "UNKNOWN_ERROR_OCCURRED"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, pk=None, *args, **kwargs):
        instance = get_object_or_404(Donor, pk=pk)
        donorSerializer = DonorSerializer(
            instance=instance, data=request.data, partial=True)
        if donorSerializer.is_valid(raise_exception=True):
            donorSerializer.save()
        return Response({'detail': "Profile Updated Successfully."}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'], permission_classes=[TotalDonorPermission])
    def total_donor(self, request):
        queryset = Donor.objects.all()
        return Response({'total_donor': len(queryset)})
