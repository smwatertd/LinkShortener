from rest_framework.exceptions import APIException


class ShortUrlNotFound(APIException):
    status_code = 404
    default_detail = {
        'status': 'Ошибка',
        'message': 'Короткий URL не найден',
    }


class CreationSocketException(APIException):
    status_code = 400
    default_detail = {
        'status': 'Ошибка',
        'message': 'Неверные данные: полный URL',
    }


class AnonymousUserException(APIException):
    status_code = 401
    default_detail = {
        'status': 'fail',
        'message': 'Неизвестный пользователь',
    }
