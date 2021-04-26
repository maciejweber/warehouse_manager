from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from phonenumber_field.modelfields import PhoneNumberField


class UserManager(BaseUserManager):
    def create_user(self, email, name, phone, password=None):
        if not email:
            raise ValueError("Users must have an Emaill address")
        if not name:
            raise ValueError("Users must have an name")
        if not phone:
            raise ValueError("Users must have an phone number")
        user  = self.model(
                email=self.normalize_email(email),
                password=password,
                name=name,
                phone=phone
        )
        # password = UserManager().make_random_password()
        
        user.set_password(password)
        user.save()
        return user

    def create_staffuser(self, email, name, phone, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            name=name,
            phone=phone
        )
        user.is_staff = True
        user.is_superuser = False
        user.save()
        return user

    def create_superuser(self, email, name, phone, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            name=name,
            phone=phone
        )
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    name = models.CharField(max_length=60, blank=True, null=True)
    phone = PhoneNumberField(unique=True, blank=True, null=True)
    date_joined = models.DateTimeField(
        verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone']

    objects = UserManager()

    def __str__(self):
        return self.email

    def has_module_perms(self, app_label):
        return self.is_superuser

    def has_perm(self, perm, obj=None):
        return self.is_superuser
