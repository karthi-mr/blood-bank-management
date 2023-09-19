from rest_framework.viewsets import ModelViewSet

from .models import Admin
from .permissions import AdminPermission
from .serializers import AdminSerializer


class AdminViewSet(ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    permission_classes = [AdminPermission]