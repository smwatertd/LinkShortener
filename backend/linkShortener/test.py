from django.contrib.auth.models import User
from django.urls import reverse

from linkShortener.models import Socket

from rest_framework.test import (
    APIClient,
    APITestCase,
)

from rest_framework_simplejwt.tokens import AccessToken


class TestSockets(APITestCase):
    def setUp(self):
        self.short_url = 'abcdef'

        self.create_socket_url = reverse('create_sockets')
        self.user_sockets_url = reverse('get_user_sockets')
        self.redirect_url = reverse('redirect', kwargs={'short_url': 'abcdef'})

        self.success_request_data = {
            'full_url': 'https://www.youtube.com/',
        }

        self.failure_request_data = {
            'full_url': 'abc',
        }

        self.user = User.objects.create_user(
            'admin',
            'admin@gmail.com',
            'adminpassword',
        )
        self.client = APIClient()
        self.access_token = AccessToken.for_user(self.user)

    def auth_client(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')

    def test_success_auth_create_socket(self):
        self.auth_client()

        response = self.client.post(
            self.create_socket_url,
            self.success_request_data,
            format='json',
        )

        created_socket = Socket.objects.get(full_url=self.success_request_data['full_url'])
        self.assertEqual(response.status_code, 201, msg=self.create_socket_url)
        self.assertEqual(created_socket.full_url, self.success_request_data['full_url'])
        self.assertIsNotNone(created_socket.short_url)
        self.assertEqual(created_socket.author, self.user)

    def test_failure_auth_create_socket(self):
        self.auth_client()

        response = self.client.post(
            self.create_socket_url,
            self.failure_request_data,
            format='json',
        )

        self.assertEqual(response.status_code, 400)
        with self.assertRaises(Socket.DoesNotExist):
            Socket.objects.get(full_url=self.failure_request_data['full_url'])

    def test_success_anonymous_create_socket(self):
        response = self.client.post(
            self.create_socket_url,
            self.success_request_data,
            format='json',
        )

        created_socket = Socket.objects.get(full_url=self.success_request_data['full_url'])
        self.assertEqual(response.status_code, 201)
        self.assertEqual(created_socket.full_url, self.success_request_data['full_url'])
        self.assertIsNotNone(created_socket.short_url)

    def test_failure_anonymous_create_socket(self):
        response = self.client.post(
            self.create_socket_url,
            self.failure_request_data,
            format='json',
        )

        self.assertEqual(response.status_code, 400)
        with self.assertRaises(Socket.DoesNotExist):
            Socket.objects.get(full_url=self.failure_request_data['full_url'])

    def test_success_redirection(self):
        Socket.objects.create(
            author=None,
            full_url=self.success_request_data['full_url'],
            short_url=self.short_url,
        )

        response = self.client.get(self.redirect_url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['full_url'], self.success_request_data['full_url'])

    def test_failure_redirection(self):
        response = self.client.get(self.redirect_url)

        self.assertEqual(response.status_code, 404)

    def test_success_get_user_socket_list(self):
        self.auth_client()
        Socket.objects.create(
            author=self.user,
            full_url=self.success_request_data['full_url'],
            short_url=self.short_url,
        )

        response = self.client.get(
            self.user_sockets_url,
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_failure_get_user_socket_list(self):
        response = self.client.get(self.user_sockets_url)

        self.assertEqual(response.status_code, 401)
