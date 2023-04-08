
from django.db.models.query import QuerySet

from linkShortener.models import Socket


def get_user_sockets(user_id: int) -> QuerySet[Socket]:
    """
    Получение сокетов пользователя
    """
    return Socket.objects.filter(author_id=user_id)
