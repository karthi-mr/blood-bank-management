from rest_framework.routers import SimpleRouter

from .views import DonorViewSet

router = SimpleRouter()

router.register(r'donor', DonorViewSet)


urlpatterns = [

] + router.urls
