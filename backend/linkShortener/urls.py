from django.urls import path

import linkShortener.views as views


urlpatterns = [
    path('api/v1/sockets/', views.CreateSocketView.as_view()),
    path('api/v1/users/', views.UserSocketsView.as_view()),
    path('<str:short_url>/', views.RedirectionView.as_view()),
]
