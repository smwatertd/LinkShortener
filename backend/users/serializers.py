from django.contrib.auth import get_user_model

from linkShortener.models import Socket

from rest_framework import serializers


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            'username',
            'email',
            'password',
        )


class ListSocketSerializer(serializers.ModelSerializer):
    """
    Сериализатор сокетов пользователя
    """
    views = serializers.SerializerMethodField()

    class Meta:
        model = Socket
        fields = (
            'full_url',
            'short_url',
            'created_at',
            'views',
        )

    def get_views(self, obj: Socket) -> int:
        return obj.views.count()
