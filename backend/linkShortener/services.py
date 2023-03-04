from typing import Optional

from linkShortener.models import Socket
from linkShortener.utils import generate_short_url


def create_socket(full_url: str) -> Socket:
    return Socket.objects.create(
        full_url=full_url,
        short_url=generate_short_url(),
    )


def get_socket(*args, **kwargs) -> Optional[Socket]:
    return Socket.objects.filter(**kwargs).first()
