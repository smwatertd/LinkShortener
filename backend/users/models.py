from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone

from users.managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    """
    Модель пользователя
    """
    id = models.AutoField(
        primary_key=True,
    )

    username = models.CharField(
        unique=True,
        max_length=64,
    )

    email = models.EmailField(
        unique=True,
    )

    is_staff = models.BooleanField(
        default=False,
    )

    is_active = models.BooleanField(
        default=True,
    )

    date_joined = models.DateTimeField(
        default=timezone.now,
    )

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = [
        'email',
    ]

    objects = UserManager()

    def __str__(self):
        return self.username

    @property
    def is_authenticated(self):
        return True
