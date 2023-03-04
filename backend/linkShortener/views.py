from typing import Optional

from django.urls import reverse
from django.views.generic.base import RedirectView

import linkShortener.api.serializers as serializers
import linkShortener.services as services

from rest_framework.generics import CreateAPIView
from rest_framework.response import Response


class CreateSocketView(CreateAPIView):
    serializer_class = serializers.CreateSocketSerializer

    def create(self, request, *args, **kwargs) -> Response:
        serializer = self.serializer_class(request.data)
        full_url = serializer.data['full_url']
        if services.get_socket(full_url=full_url) is None:
            services.create_socket(full_url)
            return Response({'status': 'success'})
        return Response({'status': 'already exists'})


class RedirectionView(RedirectView):
    def get_redirect_url(self, *args, **kwargs) -> Optional[str]:
        socket = services.get_socket(short_url=kwargs['short_url'])
        if socket is None:
            return reverse('index')
        return socket.full_url
