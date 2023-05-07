from django.contrib.auth import get_user_model

from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from sockets.models import Socket


class CreateUserSerializer(serializers.ModelSerializer):
    """
    Сериализатор создания пользователя
    """
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
            'pk',
            'full_url',
            'short_url',
            'created_at',
            'views',
        )

    def get_views(self, obj: Socket) -> int:
        return obj.views.count()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Определение payload jwt токенов
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['username'] = user.username
        return token
