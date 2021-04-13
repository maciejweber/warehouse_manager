from rest_framework import serializers
from .models import Order, Comment, Documents
from accounts.serializers import UserSerializer


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
    author = UserSerializer()

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['author']


class OrderDetailSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(source='comment_set', many=True)
    documents = DocumentSerializer(source='documents_set', many=True)
    author = UserSerializer()

    class Meta:
        model = Order
        fields = '__all__'
