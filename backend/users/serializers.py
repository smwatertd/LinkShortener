from django.contrib.auth import get_user_model

from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


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


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Переопределение payload jwt токенов
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['username'] = user.username
        return token
