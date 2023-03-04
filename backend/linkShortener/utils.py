from functools import reduce
from random import sample

from app.settings import CHARACTERS, MAX_LENGTH

import linkShortener.services as services


def _generate_short_url() -> str:
    new_sequence = sample(CHARACTERS, MAX_LENGTH)
    return reduce(lambda short_url, character: short_url + character, new_sequence)


def generate_short_url() -> str:
    short_url = _generate_short_url()
    while services.get_socket(short_url=short_url):
        short_url = _generate_short_url()
    return short_url
