from django.test import TestCase
from orders.models.order import Order
from accounts.models import User
from datetime import timedelta
from django.utils import timezone


# class AccountTestCase(TestCase):
#     scheduled_date = timezone.now() + timedelta(days=1)

#     def setUp(self) -> None:
#         User.objects.create_user(
#             'client@gmail.com', 'Client1', '+48555666777')
#         User.objects.create_user(
#             'admin@gmail.com', 'Admin1', '+48555666888')
#         client = User.objects.get(name='Client1')
#         Order.objects.create('order1', self.scheduled_date)

#     def test_order_create(self):
#         order = Order.objects.get(name='order1')
#         self.assertEqual(order.name, 'order1')
