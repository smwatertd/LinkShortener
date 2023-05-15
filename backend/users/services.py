from django.db.models.query import QuerySet

from sockets.models import Socket

from users.models import User


def get_user_sockets(user: User) -> QuerySet[Socket]:
    """
    Получение сокетов пользователя
    """
    return Socket.objects.filter(author=user)


def delete_socket_if_exists(author: User, short_url: str) -> None:
    """
    Удаление сокета по короткому url, если существует
    """
    Socket.objects.filter(author=author, short_url=short_url).delete()
