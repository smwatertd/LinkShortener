from typing import Optional

from django.db.models.query import QuerySet
from django.http import HttpRequest

from linkShortener import utils
from linkShortener.models import Ip, Socket


def generate_short_url() -> str:
    short_url = utils.generate_short_url()
    while get_socket(short_url=short_url):
        short_url = utils.generate_short_url()
    return short_url


def create_socket(*args, **kwargs) -> Socket:
    return Socket.objects.create(
        author=kwargs['user'],
        full_url=kwargs['full_url'],
        short_url=generate_short_url(),
    )


def get_socket(*args, **kwargs) -> Optional[Socket]:
    return Socket.objects.filter(**kwargs).first()


def get_user_urls(user_id: int) -> QuerySet[Socket]:
    return Socket.objects.filter(author_id=user_id)


def contains_ip(socket: Socket, ip: Ip) -> bool:
    return socket.views.contains(ip)


def update_socket(socket: Socket, ip: Ip) -> None:
    if contains_ip(socket, ip):
        return
    socket.views.add(ip)
    socket.save()


def get_or_create_ip(request: HttpRequest) -> Ip:
    request_ip = utils.get_ip(request)
    return Ip.objects.get_or_create(address=request_ip)[0]
