from rest_framework import serializers
from datetime import date

from orders.models.order import Order
from orders.models.comment import Comment
from accounts.serializers.account import AccountSerializer
from orders.serializers.comment import CommentSerializer
from orders.serializers.document import DocumentSerializer
from django.contrib.auth import get_user_model
User = get_user_model()


class OrdersListSerializer(serializers.ModelSerializer):
    created_date = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    author = AccountSerializer(read_only=True)
    documents = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['author', 'documents', 'comments']

    def get_comments(self, order):
        qs = order.comments.all().order_by('-created_date')
        return CommentSerializer(qs, many=True, read_only=True).data

    def get_documents(self, order):
        qs = order.documents.all().order_by('-created_date')
        return DocumentSerializer(qs, many=True, read_only=True).data

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance

    def create(self, validated_data):
        scheduled_date = validated_data.get("scheduled_date")

        if scheduled_date < date.today():
            raise serializers.ValidationError(
                {"scheduled_date": "Date cannot be earlier than today"})

        return Order.objects.create(**validated_data)
