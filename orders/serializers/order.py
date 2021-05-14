from rest_framework import serializers
from datetime import date

from orders.models.order import Order
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
    comments = CommentSerializer(
        source='comment_set', many=True, read_only=True)
    documents = DocumentSerializer(
        source='document_set', many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['author']

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance

    def validate(self, attrs):
        scheduled_date = attrs.get("scheduled_date")

        if scheduled_date < date.today():
            raise serializers.ValidationError(
                {"scheduled_date": "Date cannot be earlier than today"})

        return attrs
