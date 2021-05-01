from rest_framework import serializers
from .models import Order, Comment, Documents
from accounts.serializers.account import AccountSerializer
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
    author = AccountSerializer()

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['author']

    def update(self, instance, validated_data):
        print(validated_data.get('status', instance.status))
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance
