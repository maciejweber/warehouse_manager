from rest_framework import generics, permissions, status
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from django.http import Http404
from accounts.serializers.client import ClientSerializer
from ..premissions import IsSuperUser
User = get_user_model()

class ClientsList(generics.ListAPIView):
    """
    Display all clients
    """
    queryset = User.clients.all().order_by('-date_joined')
    serializer_class = ClientSerializer
    permission_classes = [IsSuperUser]

class ClientDetail(generics.RetrieveAPIView):
    """
    Client detail
    """
    serializer_class = ClientSerializer
    permission_classes = [IsSuperUser]
    queryset = User.clients.all()

class ClientCreate(generics.CreateAPIView):
    """
    Create account for client
    """
    serializer_class = ClientSerializer
    permission_classes = [IsSuperUser]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": ClientSerializer(user, context=self.get_serializer_context()).data
        })
