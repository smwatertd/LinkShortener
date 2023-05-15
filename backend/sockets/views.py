from typing import Type

from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response

import sockets.serializers as serializers
import sockets.services as services
from sockets import exceptions


class CreateSocketView(CreateAPIView):
    """
    Представление создания и удаления сокета
    """
    def _get_create_socket_serializer_class(self) -> Type[serializers.CreateSocketSerializer]:
        """
        Получение сериализатора создания сокета
        """
        return serializers.CreateSocketSerializer

    def _get_socket_serializer_class(self) -> Type[serializers.SocketSerializer]:
        """
        Получение сериализатора сокета
        """
        return serializers.SocketSerializer

    def post(self, request, *args, **kwargs) -> Response:
        """
        Создание сокета
        """
        create_socket_serializer = self._get_create_socket_serializer_class()(data=request.data)
        if not create_socket_serializer.is_valid():
            raise exceptions.FullUrlIncorrect

        socket = services.create_socket(request.user, **create_socket_serializer.data)
        socket_serializer = self._get_socket_serializer_class()(socket)
        return Response(socket_serializer.data, status=status.HTTP_201_CREATED)


class RedirectView(RetrieveAPIView):
    """
    Представление перенаправления по короткому url
    """
    serializer_class = serializers.RedirectSerializer

    def get(self, request, short_url: str, *args, **kwargs):
        """
        Получение полного url по короткому
        """
        socket = services.get_socket(short_url=short_url)
        user_ip = services.get_or_create_ip(request)
        services.add_ip_to_socket_views(socket, user_ip)
        serializer = self.serializer_class(socket)
        return Response(serializer.data, status=status.HTTP_200_OK)
