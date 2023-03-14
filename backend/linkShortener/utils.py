from functools import reduce
from random import sample

from app.settings import CHARACTERS, MAX_LENGTH

from django.http import HttpRequest

from linkShortener.models import Ip


def generate_short_url() -> str:
    """
    Генератор короткого url
    """
    new_sequence = sample(CHARACTERS, MAX_LENGTH)
    return reduce(lambda short_url, character: short_url + character, new_sequence)


def get_ip(request: HttpRequest) -> Ip:
    """
    Получение ip пользователя по http запросу
    """
    address = request.META.get('HTTP_X_FORWARDED_FOR')
    if address:
        ip = address.split(',')[-1].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip
