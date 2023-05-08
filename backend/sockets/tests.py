from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient, APITestCase

from rest_framework_simplejwt.tokens import AccessToken

from sockets.models import Socket


class TestSockets(APITestCase):
    def setUp(self):
        # Данные
        self.correct_short_url = 'correct_short_url'
        self.incorrect_short_url = 'incorrect_short_url'
        self.correct_full_url = 'https://www.example.com/'
        self.incorrect_full_url = 'wrong_full_url'
        self.correct_request_data = {'full_url': self.correct_full_url}
        self.incorrect_request_data = {'full_url': self.incorrect_full_url}
        self.user = self._create_user()

        # API клиент
        self.client = APIClient()

        # Urls
        self.create_socket_url = reverse('create_socket')
        self.user_url = reverse('users')
        self.redirect_url = reverse(
            'redirect',
            kwargs={'short_url': self.correct_short_url},
        )
        self.delete_socket_url = reverse(
            'delete_socket',
            kwargs={'pk': self.correct_short_url},
        )

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

    def test_success_not_auth_create_socket(self):
        """
        Успешное создание сокета без автора
        """
        response = self.client.post(
            self.create_socket_url,
            self.correct_request_data,
        )

        socket = Socket.objects.get(full_url=self.correct_full_url)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(socket.full_url, self.correct_full_url)
        self.assertEqual(socket.author, None)
        self.assertIsNotNone(socket.short_url)

    def test_failure_not_auth_create_socket(self):
        """
        Неуспешное создание сокета без автора.
        Причина: неправильный полный url
        """
        response = self.client.post(
            self.create_socket_url,
            self.incorrect_request_data,
        )

        self.assertEqual(response.status_code, 400)
        with self.assertRaises(Socket.DoesNotExist):
            Socket.objects.get(full_url=self.incorrect_full_url)

    def test_success_redirection(self):
        """
        Успешное получение полного url по короткому
        """
        socket = Socket.objects.create(
            full_url=self.correct_full_url,
            short_url=self.correct_short_url,
        )

        response = self.client.get(self.redirect_url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['full_url'], self.correct_full_url)
        self.assertEqual(socket.views.count(), 1)

    def test_failure_redirection(self):
        """
        Неуспешное получение полного url по короткому.
        Причина: сокет не существует
        """
        response = self.client.get(self.redirect_url)

        self.assertEqual(response.status_code, 404)

    def test_success_delete_socket(self):
        """
        Успешное удаление сокета
        """
        Socket.objects.create(
            author=self.user,
            full_url=self.correct_full_url,
            short_url=self.correct_short_url,
        )
        self._set_client_credentials()

        response = self.client.delete(self.delete_socket_url)

        sockets_count = Socket.objects.filter(short_url=self.correct_short_url).count()
        self.assertEqual(response.status_code, 204)
        self.assertEqual(sockets_count, 0)

    def test_failure_wrong_url_delete_socket(self):
        """
        Неудачное удаление сокета.
        Причина: неправильный короткий url
        """
        Socket.objects.create(
            author=self.user,
            full_url=self.correct_full_url,
            short_url=self.incorrect_short_url,
        )

        response = self.client.delete(self.delete_socket_url)

        sockets_count = Socket.objects.filter(short_url=self.incorrect_short_url).count()
        self.assertEqual(response.status_code, 204)
        self.assertEqual(sockets_count, 1)

    def test_failure_not_author_delete_socket(self):
        """
        Неудачное удаление сокета.
        Причина: у сокета другой автор
        """
        other_user = self._create_user(
            username='user',
            email='user@gmail.com',
            password='userPassword',
        )
        Socket.objects.create(
            author=other_user,
            full_url=self.correct_full_url,
            short_url=self.correct_short_url,
        )
        self._set_client_credentials()

        response = self.client.delete(self.delete_socket_url)

        sockets_count = Socket.objects.filter(short_url=self.correct_short_url).count()
        self.assertEqual(response.status_code, 204)
        self.assertEqual(sockets_count, 1)
