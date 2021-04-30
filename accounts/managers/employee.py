from django.db import models

class EmployeeManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_staff=True, is_superuser=False)
