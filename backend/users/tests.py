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
        self.incorrect_full_url = 'incorrect_full_url'
        self.correct_request_data = {'full_url': self.correct_full_url}
        self.incorrect_request_data = {'full_url': self.incorrect_full_url}
        self.client = APIClient()

        User = get_user_model()
        self.user = User.objects.create(
            username='admin',
            email='admin@gmail.com',
            password='adminpassword',
        )
        access_token = AccessToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

        # Urls
        self.create_socket_url = reverse('create_sockets')
        self.user_sockets_url = reverse('user_view')

    def test_success_create_socket(self):
        response = self.client.post(
            self.create_socket_url,
            self.correct_request_data,
        )

        created_socket = Socket.objects.get(full_url=self.correct_full_url)
        self.assertEqual(response.status_code, 201, msg=self.create_socket_url)
        self.assertEqual(created_socket.full_url, self.correct_full_url)
        self.assertIsNotNone(created_socket.short_url)
        self.assertEqual(created_socket.author, self.user)

    def test_failure_create_socket(self):
        response = self.client.post(
            self.create_socket_url,
            self.incorrect_request_data,
        )

        self.assertEqual(response.status_code, 400)
        with self.assertRaises(Socket.DoesNotExist):
            Socket.objects.get(full_url=self.incorrect_full_url)

    def test_success_get_user_socket_list(self):
        Socket.objects.create(
            author=self.user,
            full_url=self.correct_full_url,
            short_url=self.correct_short_url,
        )

        response = self.client.get(self.user_sockets_url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_failure_get_user_socket_list(self):
        self.client.logout()
        response = self.client.get(self.user_sockets_url)

        self.assertEqual(response.status_code, 401)
