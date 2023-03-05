from typing import Optional

from django.views.generic.base import RedirectView

import linkShortener.api.serializers as serializers
import linkShortener.services as services

from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class CreateSocketView(CreateAPIView):
    serializer_class = serializers.CreateSocketSerializer

    def create(self, request, *args, **kwargs) -> Response:
        user = request.user if request.user.is_authenticated else None
        serializer = self.serializer_class(request.data).data
        full_url = serializer['full_url']
        socket = services.get_socket(full_url=full_url)

        if socket is not None:
            return Response({'status': 'already exists'})

        services.create_socket(
                user=user,
                full_url=full_url,
            )
        return Response({'status': 'success'})


class RedirectionView(RedirectView):
    def get_redirect_url(self, *args, **kwargs) -> Optional[str]:
        socket = services.get_socket(short_url=kwargs['short_url'])

        if socket is None:
            return None

        ip = services.get_or_create_ip(self.request)
        services.update_socket(socket, ip)
        return socket.full_url


class UserSocketsView(ListAPIView):
    permission_classes = (
        IsAuthenticated,
    )

    def get(self, request, *args, **kwargs) -> Response:
        user_urls = services.get_user_urls(request.user.id)
        serializer = serializers.ListSocketSerializer(
            user_urls,
            many=True,
        )
        return Response(serializer.data)
