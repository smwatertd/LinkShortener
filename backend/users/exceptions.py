from rest_framework.exceptions import APIException


class RegistrationFormIncorrect(APIException):
    """
    Исключение неправильной формы регистрации
    """
    status_code = 400
    default_detail = {
        'status': 'fail',
        'message': 'Ошибка. Пожалуйста, убедитесь в корректности данных',
    }


class LoginFormIncorrect(APIException):
    """
    Исключение неправильной формы авторизации
    """
    status_code = 401
    default_detail = {
        'status': 'fail',
        'message': 'Ошибка. Пожалуйста, убедитесь в корректности данных',
    }
