from django.contrib.auth import get_user_model

from typing import Type, Union

from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from users import exceptions, serializers, services


class UserView(ListCreateAPIView):
    """
    Представление пользователя
    """
    def get(self, request, *args, **kwargs) -> Response:
        """
        Получение сокетов пользователя
        """
        if not request.user.is_authenticated:
            raise exceptions.NotAuthenticatedUser
        user_sockets = services.get_user_sockets(request.user.id)
        serializer = self.get_serializer_class()(
            user_sockets,
            many=True,
        )
        return Response(serializer.data)

    def post(self, request, *args, **kwargs) -> Response:
        """
        Создание нового пользователя
        """
        serializer = self.get_serializer_class()(data=request.data)
        if not serializer.is_valid():
            raise exceptions.UserFormIncorrect
        serializer = serializer.data
        User = get_user_model()
        User.objects.create_user(
            serializer['username'],
            serializer['email'],
            serializer['password'],
        )
        return Response(
            {'status': 'success'},
            status=status.HTTP_201_CREATED,
        )

    def get_serializer_class(self) -> Union[
        Type[serializers.ListSocketSerializer],
        Type[serializers.CreateUserSerializer],
    ]:
        if self.request.method == 'GET':
            return serializers.ListSocketSerializer
        return serializers.CreateUserSerializer
