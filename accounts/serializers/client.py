from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','name','phone','date_joined','last_login','is_active']
        extra_kwargs = {
            'name': {'required': True},
            'phone': {'required': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['email'], validated_data['name'], validated_data['phone'])
        return user
