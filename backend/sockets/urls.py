from django.urls import path

import sockets.views as views


urlpatterns = [
    path('api/v1/sockets/', views.CreateDeleteSocketView.as_view(), name='create_socket'),
    path('api/v1/sockets/<str:pk>/', views.CreateDeleteSocketView.as_view(), name='delete_socket'),
    path('api/<str:short_url>/', views.RedirectView.as_view(), name='redirect'),
]
