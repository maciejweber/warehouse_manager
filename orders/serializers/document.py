from rest_framework import serializers
from django.contrib.auth import get_user_model
from orders.models.document import Document
User = get_user_model()


class DocumentSerializer(serializers.ModelSerializer):
    created_date = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    author = serializers.SerializerMethodField("get_email")

    def get_email(self, obj):
        return obj.author.email

    class Meta:
        model = Document
        fields = '__all__'
        read_only_fields = ['created_date', 'author']
