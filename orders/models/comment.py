from django.db import models
from django.contrib.auth import get_user_model
from orders.models.order import Order
User = get_user_model()


class Comment(models.Model):
    author = models.ForeignKey(
        User, related_name='comments', on_delete=models.DO_NOTHING)
    content = models.CharField(max_length=128)
    created_date = models.DateTimeField(auto_now_add=True)
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name='order')

    def __str__(self):
        return str(self.order) + ' - ' + str(self.author)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.order.save()
