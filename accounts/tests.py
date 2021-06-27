from django.test import TestCase
from .models import User


class AccountTestCase(TestCase):
    def setUp(self) -> None:
        User.objects.create_user(
            'client@gmail.com', 'Client1', '+48555666777')
        User.objects.create_user(
            'admin@gmail.com', 'Admin1', '+48555666888')

    def test_account_client(self):
        client = User.objects.get(name='Client1')
        self.assertEqual(client.email, 'client@gmail.com')

    def test_account_admin(self):
        admin = User.objects.get(name='Admin1')
        self.assertEqual(admin.email, 'admin@gmail.com')
