from rest_framework.viewsets import ModelViewSet

from .models import Donor
from .serializers import DonorSerializer

class DonorViewSet(ModelViewSet):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer