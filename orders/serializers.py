from rest_framework import serializers
from .models import Order, Comment, Documents
from accounts.serializers import UserSerializer
from django.contrib.auth import get_user_model
User = get_user_model()


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['created_date', 'author']


class DocumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Documents
        fields = '__all__'
        read_only_fields = ['created_date', 'author']


class OrdersListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ['id', 'author', 'title', 'status',
                  'scheduled_date', 'updated_at']
        read_only_fields = ['author']


class OrderDetailSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(source='comment_set', many=True)
    documents = DocumentSerializer(source='documents_set', many=True)
    author = UserSerializer()

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['author']
