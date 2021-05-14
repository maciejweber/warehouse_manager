from rest_framework import serializers
from .models import Order, Comment, Documents
from accounts.serializers.account import AccountSerializer
from django.contrib.auth import get_user_model
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


class DocumentSerializer(serializers.ModelSerializer):
    created_date = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    author = serializers.SerializerMethodField("get_email")

    def get_email(self, obj):
        return obj.author.email

    class Meta:
        model = Documents
        fields = '__all__'
        read_only_fields = ['created_date', 'author']


class OrdersListSerializer(serializers.ModelSerializer):
    created_date = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    author = AccountSerializer(read_only=True)
    comments = CommentSerializer(
        source='comment_set', many=True, read_only=True)
    documents = DocumentSerializer(
        source='documents_set', many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['author']

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance
