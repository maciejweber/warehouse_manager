from django.db import models

class ClientManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_staff=False, is_superuser=False)
