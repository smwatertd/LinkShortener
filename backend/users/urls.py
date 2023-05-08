from django.urls import path

from users import views


urlpatterns = [
    path('api/v1/users/', views.UserView.as_view(), name='users'),
]
