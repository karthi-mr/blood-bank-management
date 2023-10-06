from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from app.pagination import CustomPagination

from .filters import PatientSearchFilter, SortFilter
from .models import Patient
from .permissions import PatientPermission, TotalPatientPermission
from .serializers import PatientSerializer


class PatientViewSet(ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [PatientPermission]
    pagination_class = CustomPagination
    filter_backends = [SortFilter, PatientSearchFilter]

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        patientSerializer = PatientSerializer(queryset, many=True)
        page = self.paginate_queryset(patientSerializer.data)
        return self.get_paginated_response(page)

    def partial_update(self, request, pk=None, *args, **kwargs):
        instance = get_object_or_404(Patient, pk=pk)
        donorSerializer = PatientSerializer(
            instance=instance, data=request.data, partial=True)
        if donorSerializer.is_valid(raise_exception=True):
            donorSerializer.save()
        return Response({'detail': "Profile Updated Successfully."}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'], permission_classes=[TotalPatientPermission])
    def total_patient(self, request):
        queryset = Patient.objects.all()
        return Response({'total_patient': len(queryset)})
