from rest_framework import permissions, generics, exceptions

from orders.models.order import Order
from orders.models.comment import Comment
from orders.permissions import IsOwnerOrAdmin
from orders.serializers.comment import CommentSerializer


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


class CommentDestroy(generics.DestroyAPIView):
    permission_classes = [IsOwnerOrAdmin]
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
