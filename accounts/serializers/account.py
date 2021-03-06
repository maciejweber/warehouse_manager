from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class AccountSerializer(serializers.ModelSerializer):
    last_login = serializers.DateTimeField(
        format="%Y-%m-%d - %H:%M", read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'phone',
                  'date_joined', 'last_login', 'is_active', 'is_staff', 'is_superuser']
        extra_kwargs = {
            'name': {'required': True},
            'phone': {'required': True},
            'is_staff': {'required': True}
        }

    def create(self, validated_data):
        if validated_data['is_staff'] == True:
            print('is staff')
            user = User.objects.create_employee(
                validated_data['email'], validated_data['name'], validated_data['phone'])
        else:
            print('normal')
            user = User.objects.create_user(
                validated_data['email'], validated_data['name'], validated_data['phone'])
        return user

    def update(self, instance, validated_data):
        instance.is_active = validated_data.get(
            'is_active', instance.is_active)
        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    new_password2 = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError(
                {"detail": "Password fields didn't match."})
        return attrs

    def validate_new_password(self, value):
        validate_password(value)
        return value
