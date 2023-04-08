from linkShortener.models import Socket

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
    class Meta:
        model = Socket
        fields = (
            'full_url',
        )
