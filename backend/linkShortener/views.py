import linkShortener.serializers as serializers
import linkShortener.services as services
from linkShortener.exceptions import FullUrlIncorrect

from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class CreateSocketView(CreateAPIView):
    """
    Представление создания сокета
    """
    serializer_class = serializers.CreateSocketSerializer

    def create(self, request, *args, **kwargs) -> Response:
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            raise FullUrlIncorrect

        services.create_socket(
            request.user,
            serializer.data['full_url'],
        )
        return Response(
            {'status': 'success'},
            status=status.HTTP_201_CREATED,
        )


class RedirectView(RetrieveAPIView):
    """
    Представление для перенаправления по короткому url
    """
    serializer_class = serializers.RedirectSerializer

    def get(self, request, short_url: str, *args, **kwargs):
        socket = services.get_socket(short_url=short_url)
        serializer = self.serializer_class(socket)
        return Response(serializer.data)


class UserSocketsView(ListAPIView):
    """
    Представление списка сокетов пользователя
    """
    serializer_class = serializers.ListSocketSerializer
    permission_classes = (
        IsAuthenticated,
    )

    def get(self, request, *args, **kwargs) -> Response:
        user_sockets = services.get_user_sockets(request.user.id)
        serializer = self.serializer_class(
            user_sockets,
            many=True,
        )
        return Response(serializer.data)
