from rest_framework.exceptions import APIException


class UserFormIncorrect(APIException):
    status_code = 400
    default_detail = {
        'status': 'fail',
        'info': 'User form is not correct',
    }
