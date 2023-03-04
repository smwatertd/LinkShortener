from djongo import models


class Socket(models.Model):
    full_url = models.URLField(
        unique=True,
    )

    short_url = models.URLField(
        unique=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )
