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


class RedirectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Socket
        fields = (
            'full_url',
        )
