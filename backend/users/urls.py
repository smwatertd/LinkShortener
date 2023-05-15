from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from users import views


urlpatterns = [
    path('api/token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/v1/users/', views.UserView.as_view(), name='users'),
]
