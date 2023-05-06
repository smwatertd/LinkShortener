import sockets.serializers as serializers
import sockets.services as services
from sockets import exceptions

from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView


class CreateDeleteSocketView(APIView):
    """
    Представление создания и удаления сокета
    """
    serializer_class = serializers.CreateSocketSerializer

    def post(self, request, *args, **kwargs) -> Response:
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            raise exceptions.FullUrlIncorrect

        socket = services.create_socket(
            request.user,
            serializer.data['full_url'],
        )
        return Response(
            serializers.SocketSerializer(socket).data,
            status=status.HTTP_201_CREATED,
        )

    def delete(self, request, pk, *args, **kwargs) -> Response:
        if request.user.is_authenticated:
            services.delete_socket_if_exists(
                request.user,
                pk,
            )
        return Response(
            status=status.HTTP_204_NO_CONTENT,
        )


class RedirectView(RetrieveAPIView):
    """
    Представление перенаправления по короткому url
    """
    serializer_class = serializers.RedirectSerializer

    def get(self, request, short_url: str, *args, **kwargs):
        socket = services.get_socket(short_url=short_url)
        services.add_ip_to_socket_views(
            socket,
            services.get_or_create_ip(request),
        )
        serializer = self.serializer_class(socket)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )
