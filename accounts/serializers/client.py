from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'phone',
                  'date_joined', 'last_login', 'is_active', 'is_staff']
        extra_kwargs = {
            'name': {'required': True},
            'phone': {'required': True},
            'is_staff': {'required': True}
        }

    def create(self, validated_data):
        print(validated_data)
        if validated_data['is_staff'] == True:
            user = User.objects.create_superuser(
                validated_data['email'], validated_data['name'], validated_data['phone'])
        else:
            user = User.objects.create_user(
                validated_data['email'], validated_data['name'], validated_data['phone'])
        return user
