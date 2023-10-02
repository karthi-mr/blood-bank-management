from django.urls import path
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (MyObtainTokenPairView, ResetPasswordView, get_my_profile,
                    get_tab)

router = SimpleRouter()


urlpatterns = [
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('register/', RegisterView.as_view(), name='auth_register'),
    path('reset-password/', ResetPasswordView.as_view(), name='auth_register'),
    path('tab/', get_tab, name='get-tab'),
    path('my-profile/', get_my_profile, name='get-my-profile')

] + router.urls
