from django.contrib.auth import get_user_model
from django.urls import reverse

from linkShortener.models import Socket

from rest_framework.test import APIClient, APITestCase

from rest_framework_simplejwt.tokens import AccessToken


class TestSockets(APITestCase):
    def setUp(self):
        self.short_url = 'abcdef'

        self.create_socket_url = reverse('create_sockets')
        self.user_sockets_url = reverse('user_view')

        self.success_request_data = {
            'full_url': 'https://www.youtube.com/',
        }

        self.failure_request_data = {
            'full_url': 'abc',
        }

        User = get_user_model()
        self.user = User.objects.create_user(
            'admin',
            'admin@gmail.com',
            'adminpassword',
        )

        self.client = APIClient()
        self.access_token = AccessToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')

    def test_success_create_socket(self):
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

    def test_failure_create_socket(self):
        response = self.client.post(
            self.create_socket_url,
            self.failure_request_data,
            format='json',
        )

        self.assertEqual(response.status_code, 400)
        with self.assertRaises(Socket.DoesNotExist):
            Socket.objects.get(full_url=self.failure_request_data['full_url'])

    def test_success_get_user_socket_list(self):
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
        self.client.logout()
        response = self.client.get(self.user_sockets_url)

        self.assertEqual(response.status_code, 401)
