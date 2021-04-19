from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

STATUS = [
    ('1', 'Waiting for delivery'),
    ('2', 'In warehouse'),
    ('3', 'Issued')
]


class Order(models.Model):
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    title = models.CharField(max_length=80)
    status = models.CharField(max_length=1, choices=STATUS, default='1')
    created_date = models.DateTimeField(auto_now_add=True)
    scheduled_date = models.DateField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    author = models.ForeignKey(
        User, related_name='comments', on_delete=models.DO_NOTHING)
    content = models.CharField(max_length=128)
    created_date = models.DateTimeField(auto_now_add=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.order) + ' - ' + str(self.author)


class Documents(models.Model):
    author = models.ForeignKey(
        User, related_name='documents', on_delete=models.DO_NOTHING)
    document = models.FileField(upload_to='doc')
    created_date = models.DateTimeField(auto_now_add=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
