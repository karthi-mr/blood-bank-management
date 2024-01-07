from rest_framework.routers import SimpleRouter

from .views import (BloodDonateHistoryViewSet, BloodDonateViewSet,
                    BloodGroupViewSet, BloodRequestHistoryViewSet,
                    BloodRequestViewSet, BranchViewSet, StockViewSet)

router = SimpleRouter()
router.register(r'blood-group', BloodGroupViewSet,
                basename='blood-group')
router.register(r'blood-stock', StockViewSet,
                basename='blood-stock')
router.register(r'blood-request', BloodRequestViewSet,
                basename='blood-request')
router.register(r'blood-request-history', BloodRequestHistoryViewSet,
                basename='blood-request-history')
router.register(r'donate-blood', BloodDonateViewSet)
router.register(r'donate-blood-history',
                BloodDonateHistoryViewSet, basename='history')
router.register(r'branch',
                BranchViewSet, basename='branch')

urlpatterns = [

] + router.urls
