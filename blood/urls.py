from rest_framework.routers import SimpleRouter

from .views import BloodGroupViewSet, BloodRequestViewSet, StockViewSet, BloodRequestHistoryViewSet

router = SimpleRouter()
router.register(r'blood-group', BloodGroupViewSet,
                basename='blood-group')
router.register(r'blood-stock', StockViewSet,
                basename='blood-stock')
router.register(r'blood-request', BloodRequestViewSet,
                basename='blood-request')
router.register(r'blood-request-history', BloodRequestHistoryViewSet,
                basename='blood-request-history')

urlpatterns = [

] + router.urls
