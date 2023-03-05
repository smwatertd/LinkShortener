from django.contrib.auth import get_user_model

from djongo import models


class Ip(models.Model):
    address = models.CharField(
        primary_key=True,
        max_length=40,
    )


class Socket(models.Model):
    author = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        null=True,
        default=None,
    )

    full_url = models.URLField(
        primary_key=True,
        db_index=True,
    )

    short_url = models.URLField(
        unique=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    last_visited_at = models.DateTimeField(
        auto_now=True,
    )

    views = models.ManyToManyField(
        Ip,
    )
