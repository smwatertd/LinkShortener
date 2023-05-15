from typing import Optional, Type

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.views import TokenObtainPairView

from users import exceptions, serializers, services


class UserView(APIView):
    """
    Представление пользователя
    """
    def get_serializer_class(self) -> Optional[Type[serializers.CreateUserSerializer]]:
        if self.request.method == 'POST':
            return serializers.CreateUserSerializer

    def post(self, request, *args, **kwargs) -> Response:
        """
        Создание нового пользователя
        """
        print(1)
        serializer = self.get_serializer_class()(data=request.data)
        if not serializer.is_valid():
            raise exceptions.RegistrationFormIncorrect

        services.create_user(**serializer.data)
        return Response(status=status.HTTP_201_CREATED)


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Представление получения access и refresh токенов
    """
    def post(self, request, *args, **kwargs) -> Response:
        username, password = request.data.values()
        if not (username and password and services.is_user_exists(username, password)):
            raise exceptions.LoginFormIncorrect
        return super().post(request=request, *args, **kwargs)
