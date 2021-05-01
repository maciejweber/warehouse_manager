from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from accounts.serializers.employee import EmployeeSerializer, CreateEmployeeSerializer
User = get_user_model()

class EmployeesList(generics.ListAPIView):
    """
    Display all employees
    """
    queryset = User.employees.all()
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAdminUser]

class EmployeeCreate(generics.CreateAPIView):
    """
    Create account for employee
    """
    serializer_class = CreateEmployeeSerializer
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": EmployeeSerializer(user, context=self.get_serializer_context()).data
        })

class DeactivateEmployeeAccount(generics.UpdateAPIView):
    """
    Deactivate employee account
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


class ActiveEmployeeAccount(generics.UpdateAPIView):
    """
    Active employee account
    """
    permission_classes = [permissions.IsAdminUser]

    def get_object(self, pk):
        try:
            return User.employees.get(id=pk)
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