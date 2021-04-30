from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from accounts.serializers.client import ClientSerializer, CreateClientSerializer
User = get_user_model()

class ClientsList(generics.ListAPIView):
    """
    Display all clients
    """
    queryset = User.clients.all()
    serializer_class = ClientSerializer
    permission_classes = [permissions.AllowAny]

class ClientCreate(generics.CreateAPIView):
    """
    Create client
    """
    serializer_class = CreateClientSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": EmployeeSerializer(user, context=self.get_serializer_context()).data
        })