from users.models import User


def is_user_exists(username: str, password: str) -> bool:
    user = User.objects.filter(username=username).first()
    if user is None:
        return False
    return user.check_password(password)


def create_user(**user_data) -> None:
    User.objects.create_user(**user_data)
