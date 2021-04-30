from django.urls import path, include
from accounts.api.account import LoginAPI, UserAPI, ChangePasswordView
from accounts.api.client import ClientsList, ClientCreate
from accounts.api.employee import EmployeesList, EmployeeCreate
from knox import views as knox_views

urlpatterns = [
    path('api/auth/login/', LoginAPI.as_view()),
    path('api/auth/change_password/', ChangePasswordView.as_view()),
    path('api/auth/user/', UserAPI.as_view()),
    path('api/auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/', include('knox.urls')),

    path('api/clients/list/', ClientsList.as_view()),
    path('api/clients/create/', ClientCreate.as_view()),

    path('api/employees/list/', EmployeesList.as_view()),
    path('api/employees/create/', EmployeeCreate.as_view()),
]
