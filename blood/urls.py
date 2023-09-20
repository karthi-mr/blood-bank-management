from rest_framework.routers import SimpleRouter

from .views import BloodGroupViewSet, StockViewSet

router = SimpleRouter()
router.register(r'blood-group', BloodGroupViewSet,
                basename='blood-group')
router.register(r'blood-stock', StockViewSet,
                basename='blood-stock')

urlpatterns = [

] + router.urls
