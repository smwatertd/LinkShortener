from django.db.models.query import QuerySet

from sockets.models import Socket

from users import exceptions
from users.models import User


def get_user_sockets(user: User) -> QuerySet[Socket]:
    """
    Получение сокетов пользователя
    """
    if not user.is_authenticated:
        raise exceptions.NotAuthenticatedUser
    return Socket.objects.filter(author=user)
