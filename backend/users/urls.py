from django.urls import path

from users import views


urlpatterns = [
    path('api/v1/users/', views.UserView.as_view(), name='users'),
    path('api/v1/sockets/<str:pk>/', views.UserView.as_view(), name='delete_socket'),
]
