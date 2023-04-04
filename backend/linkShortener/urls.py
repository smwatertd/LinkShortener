from django.urls import path

import linkShortener.views as views


urlpatterns = [
    path('api/v1/sockets/', views.CreateSocketView.as_view(), name='create_sockets'),
    path('api/v1/users/', views.UserSocketsView.as_view(), name='get_user_sockets'),
    path('api/<str:short_url>/', views.RedirectView.as_view(), name='redirect'),
]
