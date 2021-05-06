from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework import status
from accounts.serializers.account import AccountSerializer, LoginSerializer, ChangePasswordSerializer
from django.contrib.auth import get_user_model
from ..premissions import IsSuperUser

User = get_user_model()

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [
        permissions.AllowAny,
    ]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": AccountSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = AccountSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, queryset=None):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            old_password = serializer.data.get('old_password')
            if not self.object.check_password(old_password):
                return Response({'detail': ['Wrong password']},
                                status=status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get('new_password'))
            self.object.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeactivateAccount(generics.UpdateAPIView):
    """
    Deactivate account
    """
    permission_classes = [IsSuperUser]

    def get_object(self, pk):
        try:
            return User.objects.get(id=pk)
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


class ActiveAccount(generics.UpdateAPIView):
    """
    Active account
    """
    permission_classes = [IsSuperUser]

    def get_object(self, pk):
        try:
            return User.objects.get(id=pk)
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
