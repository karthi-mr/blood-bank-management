from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from app.pagination import CustomPagination

from .models import Donor
from .permissions import DonorPermission
from .serializers import DonorSerializer


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
    