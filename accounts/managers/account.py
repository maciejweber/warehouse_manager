from django.contrib.auth.models import BaseUserManager


class AccountManager(BaseUserManager):
    def create_user(self, email, name, phone, password=None):
        if not email:
            raise ValueError("Users must have an Emaill address")
        if not name:
            raise ValueError("Users must have an name")
        if not phone:
            raise ValueError("Users must have an phone number")
        user = self.model(
            email=self.normalize_email(email),
            password=password,
            name=name,
            phone=phone
        )
        password = BaseUserManager().make_random_password()
        user.set_password(password)

        # IN THE FUTUTE, INSTEAD OF "PRINT" SEND AN EMAIL
        print(password)
        user.save()
        return user

    def create_employee(self, email, name, phone, password=None):
        if not email:
            raise ValueError("Users must have an Emaill address")
        if not name:
            raise ValueError("Users must have an name")
        if not phone:
            raise ValueError("Users must have an phone number")
        user = self.model(
            email=self.normalize_email(email),
            password=password,
            name=name,
            phone=phone,
            is_staff=True
        )
        password = BaseUserManager().make_random_password()
        user.set_password(password)
        print(password)
        # IN THE FUTUTE, INSTEAD OF "PRINT" SEND AN EMAIL

        user.save()
        return user

    def create_superuser(self, email, name, phone, password):
        user = self.create_user(
            email=self.normalize_email(email),
            name=name,
            phone=phone,
            password=password
        )
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user
