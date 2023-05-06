from sockets.models import Socket

from rest_framework import serializers


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
