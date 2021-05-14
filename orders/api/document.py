from rest_framework import permissions, generics, exceptions

from orders.models.order import Order
from orders.permissions import IsOwnerOrAdmin
from orders.models.document import Document
from orders.serializers.document import DocumentSerializer


class Documents(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DocumentSerializer

    def perform_create(self, serializer):
        order = Order.objects.get(id=serializer.validated_data['order'].id)
        if order.author.id == self.request.user.id or self.request.user.is_staff == True:
            serializer.save(author=self.request.user)
        else:
            raise exceptions.PermissionDenied(
                detail='You do not have permission')


class DocumentDestroy(generics.DestroyAPIView):
    permission_classes = [IsOwnerOrAdmin]
    serializer_class = DocumentSerializer
    queryset = Document.objects.all()
