from typing import Type

from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

import sockets.serializers as serializers
import sockets.services as services
from sockets import exceptions
from sockets.paginators import UserSocketsPaginator


class CreateSocketView(APIView):
    """
    Представление создания и удаления сокета
    """
    pagination_class = UserSocketsPaginator

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

    def _get_socket_list_serializer_class(self) -> Type[serializers.ListSocketSerializer]:
        """
        Получение сериализатора списка сокетов
        """
        return serializers.ListSocketSerializer

    def post(self, request, *args, **kwargs) -> Response:
        """
        Создание сокета
        """
        create_socket_serializer = self._get_create_socket_serializer_class()(data=request.data)
        if not create_socket_serializer.is_valid():
            raise exceptions.CreationSocketException

        socket = services.create_socket(request.user, **create_socket_serializer.data)
        socket_serializer = self._get_socket_serializer_class()(socket)
        return Response(socket_serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, *args, **kwargs) -> Response:
        """
        Получение сокетов пользователя
        """
        user_sockets = services.get_user_sockets(request.user)
        user_sockets = user_sockets.order_by('created_at')
        paginated_sockets = self.pagination_class().paginate_queryset(user_sockets, request)
        paginated_sockets = self._get_socket_list_serializer_class()(paginated_sockets, many=True)
        response_data = {
            'count': user_sockets.count(),
            'sockets': paginated_sockets.data,
        }
        return Response(response_data, status=status.HTTP_200_OK)

    def delete(self, request, pk, *args, **kwargs) -> Response:
        """
        Удаление сокета
        """
        services.delete_socket_if_exists(request.user, pk)
        return Response(status=status.HTTP_204_NO_CONTENT)


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
