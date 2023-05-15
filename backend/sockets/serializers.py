from rest_framework import serializers

from sockets.models import Socket


class CreateSocketSerializer(serializers.ModelSerializer):
    """
    Сериализатор создания сокета
    """
    class Meta:
        model = Socket
        fields = (
            'full_url',
        )


class RedirectSerializer(serializers.ModelSerializer):
    """
    Сериализатор перенаправления
    """
    class Meta:
        model = Socket
        fields = (
            'full_url',
        )


class SocketSerializer(serializers.ModelSerializer):
    """
    Сериализатор сокета
    """
    class Meta:
        model = Socket
        fields = (
            'full_url',
            'short_url',
        )


class ListSocketSerializer(serializers.ModelSerializer):
    """
    Сериализатор сокетов пользователя
    """
    views = serializers.SerializerMethodField()

    class Meta:
        model = Socket
        fields = (
            'pk',
            'full_url',
            'short_url',
            'created_at',
            'views',
        )

    def get_views(self, obj: Socket) -> int:
        return obj.views.count()
