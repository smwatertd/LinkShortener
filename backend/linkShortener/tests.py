from django.urls import reverse

from linkShortener.models import Socket

from rest_framework.test import APIClient, APITestCase


class TestSockets(APITestCase):
    def setUp(self):
        self.short_url = 'abcdef'

        self.create_socket_url = reverse('create_sockets')
        self.user_sockets_url = reverse('user_view')
        self.redirect_url = reverse(
            'redirect',
            kwargs={'short_url': self.short_url},
        )

        self.success_request_data = {
            'full_url': 'https://www.youtube.com/',
        }

        self.failure_request_data = {
            'full_url': 'abc',
        }

        self.client = APIClient()

    def test_success_create_socket(self):
        response = self.client.post(
            self.create_socket_url,
            self.success_request_data,
            format='json',
        )

        created_socket = Socket.objects.get(full_url=self.success_request_data['full_url'])
        self.assertEqual(response.status_code, 201)
        self.assertEqual(created_socket.full_url, self.success_request_data['full_url'])
        self.assertIsNotNone(created_socket.short_url)

    def test_failure_create_socket(self):
        response = self.client.post(
            self.create_socket_url,
            self.failure_request_data,
            format='json',
        )

        self.assertEqual(response.status_code, 400)
        with self.assertRaises(Socket.DoesNotExist):
            Socket.objects.get(full_url=self.failure_request_data['full_url'])

    def test_success_redirection(self):
        socket = Socket.objects.create(
            author=None,
            full_url=self.success_request_data['full_url'],
            short_url=self.short_url,
        )

        response = self.client.get(self.redirect_url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['full_url'], self.success_request_data['full_url'])
        self.assertEqual(socket.views.count(), 1)

    def test_failure_redirection(self):
        response = self.client.get(self.redirect_url)

        self.assertEqual(response.status_code, 404)
