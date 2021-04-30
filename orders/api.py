from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from .serializers import (OrdersListSerializer, CommentSerializer,
                          OrderDetailSerializer, DocumentSerializer)
from orders.models import Order, Comment, Documents
from django.http import Http404
from orders.permissions import IsOwnerOrAdmin
from rest_framework import generics
from rest_framework import exceptions


class OrderList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrdersListSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Order.objects.filter(author=self.request.user)
        if self.request.user.is_staff:
            queryset = Order.objects.all()
        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class OrderDetail(generics.RetrieveAPIView):
    permission_classes = [IsOwnerOrAdmin]
    serializer_class = OrderDetailSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Order.objects.all()
        return queryset


class CommentList(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        order = Order.objects.get(id=serializer.validated_data['order'].id)
        if order.author.id == self.request.user.id or self.request.user.is_staff == True:
            serializer.save(author=self.request.user)
        else:
            raise exceptions.PermissionDenied(
                detail='You do not have permission')


class DocumentList(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        order = Order.objects.get(id=serializer.validated_data['order'].id)
        if order.author.id == self.request.user.id or self.request.user.is_staff == True:
            serializer.save(author=self.request.user)
        else:
            raise exceptions.PermissionDenied(
                detail='You do not have permission')
