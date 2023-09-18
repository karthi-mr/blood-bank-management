from rest_framework.routers import SimpleRouter

from .views import PatientViewSet

router = SimpleRouter()

router.register(r'patient', PatientViewSet)

urlpatterns = [
    
] + router.urls
