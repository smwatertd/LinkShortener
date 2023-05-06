from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient, APITestCase

from rest_framework_simplejwt.tokens import AccessToken

from sockets.models import Socket


class TestSockets(APITestCase):
    def setUp(self):
        # Data
        self.correct_short_url = 'correct_short_url'
        self.incorrect_short_url = 'incorrect_short_url'
        self.correct_full_url = 'https://www.example.com/'
        self.incorrect_full_url = 'wrong_full_url'
        self.correct_request_data = {'full_url': self.correct_full_url}
        self.incorrect_request_data = {'full_url': self.incorrect_full_url}
        self.client = APIClient()

        User = get_user_model()
        self.user = User.objects.create(
            username='admin',
            email='admin@gmail.com',
            password='adminpassword',
        )
        self.access_token = AccessToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')

        # Urls
        self.create_socket_url = reverse('create_sockets')
        self.user_sockets_url = reverse('user_view')
        self.redirect_url = reverse(
            'redirect',
            kwargs={'short_url': self.correct_short_url},
        )
        self.delete_socket_url = reverse(
            'delete_socket',
            kwargs={'pk': self.correct_short_url},
        )

    def test_success_create_socket(self):
        response = self.client.post(
            self.create_socket_url,
            self.correct_request_data,
        )

        socket = Socket.objects.get(full_url=self.correct_full_url)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(socket.full_url, self.correct_full_url)
        self.assertIsNotNone(socket.short_url)

    def test_failure_create_socket(self):
        response = self.client.post(
            self.create_socket_url,
            self.incorrect_request_data,
        )

        self.assertEqual(response.status_code, 400)
        with self.assertRaises(Socket.DoesNotExist):
            Socket.objects.get(full_url=self.incorrect_full_url)

    def test_success_redirection(self):
        socket = Socket.objects.create(
            author=None,
            full_url=self.correct_full_url,
            short_url=self.correct_short_url,
        )

        response = self.client.get(self.redirect_url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['full_url'], self.correct_full_url)
        self.assertEqual(socket.views.count(), 1)

    def test_failure_redirection(self):
        response = self.client.get(self.redirect_url)

        self.assertEqual(response.status_code, 404)

    def test_success_delete_socket(self):
        Socket.objects.create(
            author=self.user,
            full_url=self.correct_full_url,
            short_url=self.correct_short_url,
        )

        response = self.client.delete(self.delete_socket_url)

        self.assertEqual(response.status_code, 204)
        self.assertEqual(Socket.objects.filter(short_url=self.correct_short_url).count(), 0)

    def test_failure_wrong_url_delete_socket(self):
        Socket.objects.create(
            author=self.user,
            full_url=self.correct_full_url,
            short_url=self.incorrect_short_url,
        )

        response = self.client.delete(self.delete_socket_url)

        self.assertEqual(response.status_code, 204)
        self.assertEqual(Socket.objects.filter(short_url=self.incorrect_short_url).count(), 1)

    def test_failure_not_author_delete_socket(self):
        User = get_user_model()
        user = User.objects.create(
            username='user',
            email='user@gmail.com',
            password='password',
        )
        Socket.objects.create(
            author=user,
            full_url=self.correct_full_url,
            short_url=self.correct_short_url,
        )

        response = self.client.delete(self.delete_socket_url)

        self.assertEqual(response.status_code, 204)
        self.assertEqual(Socket.objects.filter(short_url=self.correct_short_url).count(), 1)
