from rest_framework.routers import SimpleRouter

from .views import DonorViewSet, BloodDonateViewSet, BloodDonateHistoryViewSet

router = SimpleRouter()

router.register(r'donor', DonorViewSet)
router.register(r'donate-blood', BloodDonateViewSet)
router.register(r'donate-blood-history', BloodDonateHistoryViewSet, basename='history')

urlpatterns = [
    
] + router.urls
