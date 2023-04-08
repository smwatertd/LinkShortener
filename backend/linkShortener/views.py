import linkShortener.serializers as serializers
import linkShortener.services as services
from linkShortener import exceptions

from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response


class CreateSocketView(CreateAPIView):
    """
    Представление создания сокета
    """
    serializer_class = serializers.CreateSocketSerializer

    def post(self, request, *args, **kwargs) -> Response:
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            raise exceptions.FullUrlIncorrect

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
