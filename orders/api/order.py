from rest_framework import permissions, status, generics
from rest_framework.response import Response

from orders.models.order import Order
from orders.serializers.order import OrdersListSerializer


class OrderList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrdersListSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Order.objects.filter(author=self.request.user)
        if self.request.user.is_staff:
            queryset = Order.objects.all()
        return queryset.order_by('-updated_at')[:100]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class OrderDetail(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = OrdersListSerializer
    queryset = Order.objects.all()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
