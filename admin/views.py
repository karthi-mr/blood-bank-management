from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from app.pagination import CustomPagination

from .models import Admin
from .permissions import AdminPermission
from .serializers import AdminSerializer


class AdminViewSet(ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    permission_classes = [AdminPermission]
    pagination_class = CustomPagination

    def list(self, request):
        queryset = self.get_queryset()
        adminSerializer = AdminSerializer(queryset, many=True)
        page = self.paginate_queryset(adminSerializer.data)
        return self.get_paginated_response(page)
    