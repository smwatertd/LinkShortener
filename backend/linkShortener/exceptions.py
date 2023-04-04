from rest_framework.exceptions import APIException


class ShortUrlNotFound(APIException):
    status_code = 404
    default_detail = {
        'status': 'fail',
        'info': 'short url not found',
    }


class FullUrlIncorrect(APIException):
    status_code = 400
    default_detail = {
        'status': 'fail',
        'info': 'url is not correct',
    }
