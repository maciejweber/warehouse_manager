from rest_framework import generics, permissions, status
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from django.http import Http404
from accounts.serializers.client import ClientSerializer
User = get_user_model()

class ClientsList(generics.ListAPIView):
    """
    Display all clients
    """
    queryset = User.clients.all()
    serializer_class = ClientSerializer
    permission_classes = [permissions.IsAdminUser]

class ClientCreate(generics.CreateAPIView):
    """
    Create account for client
    """
    serializer_class = ClientSerializer
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": ClientSerializer(user, context=self.get_serializer_context()).data
        })

class DeactivateClientAccount(generics.UpdateAPIView):
    """
    Deactivate client account
    """
    permission_classes = [permissions.IsAdminUser]

    def get_object(self, pk):
        try:
            return User.clients.get(id=pk)
        except User.DoesNotExist:
            raise Http404

    def patch(self, request, pk):
        obj = self.get_object(pk)
        if obj.is_active == False:
            return Response(
                {"detail":"Account is already inactive"},
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )
        obj.is_active = False
        obj.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ActiveClientAccount(generics.UpdateAPIView):
    """
    Active client account
    """
    permission_classes = [permissions.IsAdminUser]

    def get_object(self, pk):
        try:
            return User.clients.get(id=pk)
        except User.DoesNotExist:
            raise Http404

    def patch(self, request, pk):
        obj = self.get_object(pk)
        if obj.is_active == True:
            return Response(
                {"detail":"Account is already active"},
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )
        obj.is_active = True
        obj.save()
        return Response(status=status.HTTP_204_NO_CONTENT)