from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('', include('users.urls')),
    path('', include('sockets.urls')),
]
