from rest_framework import serializers
from django.contrib.auth import get_user_model
from orders.models.comment import Comment
User = get_user_model()


class CommentSerializer(serializers.ModelSerializer):
    created_date = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    author = serializers.SerializerMethodField("get_email")

    def get_email(self, obj):
        return obj.author.email

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['created_date', 'author']
