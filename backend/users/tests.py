from django.contrib.auth import get_user_model
from django.urls import reverse

from parameterized import parameterized

from rest_framework.test import APIClient, APITestCase

from rest_framework_simplejwt.tokens import AccessToken

from sockets.models import Socket


class TestSockets(APITestCase):
    def setUp(self):
        # Данные
        self.correct_short_url = 'correct_short_url'
        self.incorrect_short_url = 'incorrect_short_url'
        self.correct_full_url = 'https://www.example.com/'
        self.incorrect_full_url = 'incorrect_full_url'
        self.correct_request_data = {'full_url': self.correct_full_url}
        self.incorrect_request_data = {'full_url': self.incorrect_full_url}
        self.user = self._create_user()

        # API клиент
        self.client = APIClient()
        self._set_client_credentials()

        # Urls
        self.create_socket_url = reverse('create_socket')
        self.user_sockets_url = reverse('users')

    def _create_user(self, **kwargs):
        """
        Создание тестового пользователя
        """
        kwargs.setdefault('username', 'admin')
        kwargs.setdefault('email', 'admin@gmail.com')
        kwargs.setdefault('password', 'adminPassword')
        User = get_user_model()
        user = User.objects.create(**kwargs)
        return user

    def _set_client_credentials(self):
        """
        Установка заголовка авторизации для API клиента
        """
        access_token = AccessToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

    def _logout(self):
        """
        Деавторизация API клиента
        """
        self.client.logout()

    def _get_users_count(self):
        """
        Получение количество пользователей
        """
        User = get_user_model()
        return User.objects.all().count()

    def test_success_auth_create_socket(self):
        """
        Успешное создание сокета с автором
        """
        response = self.client.post(
            self.create_socket_url,
            self.correct_request_data,
        )

        created_socket = Socket.objects.get(full_url=self.correct_full_url)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(created_socket.full_url, self.correct_full_url)
        self.assertEqual(created_socket.author, self.user)
        self.assertIsNotNone(created_socket.short_url)

    def test_failure_auth_create_socket(self):
        """
        Неуспешное создание сокета с автором
        Причина: неправильный полный url
        """
        response = self.client.post(
            self.create_socket_url,
            self.incorrect_request_data,
        )

        self.assertEqual(response.status_code, 400)
        with self.assertRaises(Socket.DoesNotExist):
            Socket.objects.get(full_url=self.incorrect_full_url)

    def test_success_get_user_sockets(self):
        """
        Успешное получение сокетов пользователя
        """
        Socket.objects.create(
            author=self.user,
            full_url=self.correct_full_url,
            short_url=self.correct_short_url,
        )

        response = self.client.get(self.user_sockets_url)

        sockets_count = len(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(sockets_count, 1)

    def test_failure_not_auth_get_user_sockets(self):
        """
        Неуспешное получение сокетов пользователя
        Причина: пользователь не авторизован
        """
        self._logout()

        response = self.client.get(self.user_sockets_url)

        self.assertEqual(response.status_code, 401)

    @parameterized.expand([
        (
            {
                'username': 'user',
                'email': 'user@gmail.com',
                'password': 'userpassword',
            },
        ),
    ])
    def test_success_create_user(self, correct_user_data):
        """
        Успешное создание пользователя
        """
        response = self.client.post(
            self.user_sockets_url,
            correct_user_data,
        )

        self.assertEqual(get_user_model().objects.count(), 2)
        self.assertEqual(response.status_code, 201)

    @parameterized.expand([
        (
            {
                'username': 'user',
                'password': 'userPassword',
            },
        ),
        (
            {
                'email': 'user@gmail.com',
                'password': 'userPassword',
            },
        ),
        (
            {
                'email': 'user@gmail.com',
                'username': 'user',
            },
        ),
    ])
    def test_failure_create_user(self, incorrect_user_data):
        """
        Неудачное создание пользователя.
        Причина: неполные данные
        """
        response = self.client.post(
            self.user_sockets_url,
            incorrect_user_data,
        )

        users_count = self._get_users_count()
        self.assertEqual(users_count, 1)
        self.assertEqual(response.status_code, 400)
