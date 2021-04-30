from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','name','phone','date_joined','last_login','is_active']


class CreateEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'name', 'phone')
        extra_kwargs = {
            'name': {'required': True},
            'phone': {'required': True}
        }

    def create(self, validated_data):
        user = User.objects.create_staffuser(
            validated_data['email'], validated_data['name'], validated_data['phone'])
        return user