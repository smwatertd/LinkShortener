from django.urls import path

import linkShortener.views as views


urlpatterns = [
    path('api/v1/sockets/', views.CreateDeleteSocketView.as_view(), name='create_sockets'),
    path('api/v1/sockets/<str:pk>/', views.CreateDeleteSocketView.as_view(), name='create_sockets'),
    path('api/<str:short_url>/', views.RedirectView.as_view(), name='redirect'),
]
