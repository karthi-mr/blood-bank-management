from rest_framework.routers import SimpleRouter

from .views import AdminViewSet

router = SimpleRouter()

router.register(r'admin', AdminViewSet)

urlpatterns = [
    
] + router.urls
