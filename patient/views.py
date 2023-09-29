from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


from app.pagination import CustomPagination

from .models import Patient
from .permissions import PatientPermission, TotalPatientPermission
from .serializers import PatientSerializer
from .filters import SortFilter


class PatientViewSet(ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [PatientPermission]
    pagination_class = CustomPagination
    filter_backends = [SortFilter]

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        patientSerializer = PatientSerializer(queryset, many=True)
        page = self.paginate_queryset(patientSerializer.data)
        return self.get_paginated_response(page)

    @action(detail=False, methods=['GET'], permission_classes=[TotalPatientPermission])
    def total_patient(self, request):
        queryset = Patient.objects.all()
        # print(len(queryset))
        return Response({'total_patient': len(queryset)})
