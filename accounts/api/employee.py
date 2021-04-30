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
    permission_classes = [permissions.AllowAny]

class EmployeeCreate(generics.CreateAPIView):
    """
    Create employee
    """
    serializer_class = CreateEmployeeSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": EmployeeSerializer(user, context=self.get_serializer_context()).data
        })