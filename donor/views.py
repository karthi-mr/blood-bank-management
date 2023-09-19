from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Donor
from .permissions import DonorPermission
from .serializers import DonorSerializer


class DonorViewSet(ModelViewSet):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer
    permission_classes = [DonorPermission]

    def list(self, request):
        queryset = self.get_queryset()
        patientSerializer = DonorSerializer(queryset, many=True)
        return Response(patientSerializer.data, status=status.HTTP_200_OK)