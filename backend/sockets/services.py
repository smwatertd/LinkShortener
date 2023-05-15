from django.http import HttpRequest

from sockets import utils
from sockets.exceptions import ShortUrlNotFound
from sockets.models import Ip, Socket


def generate_short_url() -> str:
    """
    Генератор уникального короткого url
    """
    short_url = utils.generate_short_url()
    while is_socket_exists(short_url=short_url):
        short_url = utils.generate_short_url()
    return short_url


def create_socket(user, full_url: str) -> Socket:
    """
    Создание сокета
    """
    user = user if user.is_authenticated else None
    return Socket.objects.create(
        author=user,
        full_url=full_url,
        short_url=generate_short_url(),
    )


def is_socket_exists(**kwargs) -> bool:
    """
    Существует ли сокет
    """
    return bool(Socket.objects.filter(**kwargs))


def get_socket(short_url: str) -> Socket:
    """
    Получение сокета
    """
    try:
        socket = Socket.objects.get(short_url=short_url)
    except Socket.DoesNotExist:
        raise ShortUrlNotFound
    return socket


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


def get_or_create_ip(request: HttpRequest) -> Ip:
    """
    Получение или создание ip пользователя
    """
    request_ip = utils.get_ip(request)
    return Ip.objects.get_or_create(address=request_ip)[0]
