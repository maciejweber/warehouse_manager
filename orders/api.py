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


class OrderDetail(generics.RetrieveUpdateAPIView):
    permission_classes = [IsOwnerOrAdmin]
    serializer_class = OrderDetailSerializer
    queryset = Order.objects.all()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Comments(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        order = Order.objects.get(id=serializer.validated_data['order'].id)
        if order.author.id == self.request.user.id or self.request.user.is_staff == True:
            serializer.save(author=self.request.user)
        else:
            raise exceptions.PermissionDenied(
                detail='You do not have permission')


class Documents(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        order = Order.objects.get(id=serializer.validated_data['order'].id)
        if order.author.id == self.request.user.id or self.request.user.is_staff == True:
            serializer.save(author=self.request.user)
        else:
            raise exceptions.PermissionDenied(
                detail='You do not have permission')
