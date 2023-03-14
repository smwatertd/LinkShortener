from typing import Optional

from django.db.models.query import QuerySet
from django.http import HttpRequest

from linkShortener import utils
from linkShortener.models import Ip, Socket


def generate_short_url() -> str:
    """
    Генератор уникального короткого url
    """
    short_url = utils.generate_short_url()
    while get_socket(short_url=short_url):
        short_url = utils.generate_short_url()
    return short_url


def create_socket(*args, **kwargs) -> Socket:
    """
    Создание сокета
    """
    return Socket.objects.create(
        author=kwargs['user'],
        full_url=kwargs['full_url'],
        short_url=generate_short_url(),
    )


def get_socket(*args, **kwargs) -> Optional[Socket]:
    """
    Получение сокета
    """
    return Socket.objects.filter(**kwargs).first()


def get_user_sockets(user_id: int) -> QuerySet[Socket]:
    """
    Получение сокетов пользователя
    """
    return Socket.objects.filter(author_id=user_id)


def is_socket_contains_ip(socket: Socket, ip: Ip) -> bool:
    """
    Проверка наличия ip пользователя в просмотрах сокета
    """
    return ip in socket.views.all()


def add_ip_to_socket_views(socket: Socket, ip: Ip) -> None:
    """
    Добавление ip пользователя в просмотры сокета
    """
    if is_socket_contains_ip(socket, ip):
        return
    socket.views.add(ip)
    socket.save()
    pass


def get_or_create_ip(request: HttpRequest) -> Ip:
    """
    Получение или создание ip пользователя
    """
    request_ip = utils.get_ip(request)
    return Ip.objects.get_or_create(address=request_ip)[0]
