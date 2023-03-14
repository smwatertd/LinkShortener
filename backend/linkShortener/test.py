from django.contrib.auth.models import User

import linkShortener.views as views
from linkShortener.models import Socket

from rest_framework.test import (
    APIRequestFactory,
    APITestCase,
    force_authenticate,
)


class TestSockets(APITestCase):
    def setUp(self):
        example_full_url = 'https://www.youtube.com/'
        self.create_socket_url = '/api/v1/sockets/'
        self.request_data = {
            'full_url': example_full_url,
        }

        self.user = User.objects.create_user(
            'admin',
            'admin@gmail.com',
            'adminpassword',
        )
        self.factory = APIRequestFactory()

    def test_success_auth_create_socket(self):
        request = self.factory.post(self.create_socket_url, self.request_data, format='json')
        force_authenticate(request, user=self.user)

        response = views.CreateSocketView.as_view()(request)
        created_socket = Socket.objects.get(full_url=self.request_data['full_url'])

        self.assertEqual(response.status_code, 201)
        self.assertEqual(created_socket.full_url, self.request_data['full_url'])
        self.assertIsNotNone(created_socket.short_url)
        self.assertEqual(created_socket.author, self.user)

    def test_failure_auth_create_socket(self):
        failure_example_full_url = 'abc'
        request = self.factory.post(
            self.create_socket_url,
            {'full_url': failure_example_full_url},
            format='json',
        )
        force_authenticate(request, user=self.user)

        response = views.CreateSocketView.as_view()(request)

        self.assertEqual(response.status_code, 400)
        with self.assertRaises(Socket.DoesNotExist):
            Socket.objects.get(full_url=failure_example_full_url)

    def test_success_anonymous_create_socket(self):
        request = self.factory.post(self.create_socket_url, self.request_data, format='json')

        response = views.CreateSocketView.as_view()(request)
        created_socket = Socket.objects.get(full_url=self.request_data['full_url'])

        self.assertEqual(response.status_code, 201)
        self.assertEqual(created_socket.full_url, self.request_data['full_url'])
        self.assertIsNotNone(created_socket.short_url)

    def test_failure_anonymous_create_socket(self):
        failure_example_full_url = 'abc'
        request = self.factory.post(
            self.create_socket_url,
            {'full_url': failure_example_full_url},
            format='json',
        )

        response = views.CreateSocketView.as_view()(request)

        self.assertEqual(response.status_code, 400)
        with self.assertRaises(Socket.DoesNotExist):
            Socket.objects.get(full_url=failure_example_full_url)

    def test_success_redirection(self):
        short_url = 'abcdef'
        Socket.objects.create(
            author=None,
            full_url=self.request_data['full_url'],
            short_url=short_url,
        )
        request = self.factory.get('/%s/' % short_url)
        response = views.RedirectionView.as_view()(request, short_url=short_url)

        self.assertEqual(response.status_code, 302)

    def test_failure_redirection(self):
        short_url = 'abcdef'

        request = self.factory.get('/%s/' % short_url)
        response = views.RedirectionView.as_view()(request, short_url=short_url)

        self.assertEqual(response.status_code, 410)

    def test_success_get_user_socket_list(self):
        short_url = 'abcdef'
        Socket.objects.create(
            author=self.user,
            full_url=self.request_data['full_url'],
            short_url=short_url,
        )

        request = self.factory.get('/api/v1/users/')
        force_authenticate(request, user=self.user)
        response = views.UserSocketsView.as_view()(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_failure_get_user_socket_list(self):
        request = self.factory.get('/api/v1/users/')
        response = views.UserSocketsView.as_view()(request)

        self.assertEqual(response.status_code, 401)
