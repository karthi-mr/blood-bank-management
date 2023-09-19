from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Patient
from .permissions import PatientPermission
from .serializers import PatientSerializer


class PatientViewSet(ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [PatientPermission]

    def list(self, request):
        queryset = self.get_queryset()
        patientSerializer = PatientSerializer(queryset, many=True)
        return Response(patientSerializer.data, status=status.HTTP_200_OK)
    