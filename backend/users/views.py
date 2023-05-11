from typing import Type, Union

from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from users import exceptions, serializers, services
from users.paginators import UserSocketsPaginator


class UserView(ListCreateAPIView):
    """
    Представление пользователя
    """
    pagination_class = UserSocketsPaginator

    def get(self, request, *args, **kwargs) -> Response:
        """
        Получение сокетов пользователя
        """
        user_sockets = services.get_user_sockets(request.user)
        user_sockets = user_sockets.order_by('created_at')
        paginated_sockets = self.pagination_class().paginate_queryset(user_sockets, request)
        paginated_sockets = self.get_serializer_class()(paginated_sockets, many=True)
        response_data = {
            'count': user_sockets.count(),
            'sockets': paginated_sockets.data,
        }
        return Response(response_data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs) -> Response:
        """
        Создание нового пользователя
        """
        serializer = self.get_serializer_class()(data=request.data)
        if not serializer.is_valid():
            raise exceptions.UserFormIncorrect

        get_user_model().objects.create_user(**serializer.data)
        return Response(status=status.HTTP_201_CREATED)

    def get_serializer_class(self) -> Union[
        Type[serializers.ListSocketSerializer],
        Type[serializers.CreateUserSerializer],
    ]:
        if self.request.method == 'GET':
            return serializers.ListSocketSerializer
        return serializers.CreateUserSerializer
