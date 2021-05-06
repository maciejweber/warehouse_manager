from django.urls import path, include
from accounts.api.account import LoginAPI, UserAPI, ChangePasswordView, DeactivateAccount, ActiveAccount
from accounts.api.client import ClientsList, ClientDetail, ClientCreate
from accounts.api.employee import EmployeesList, EmployeeDetail, EmployeeCreate
from knox import views as knox_views

urlpatterns = [
    path('api/auth/login/', LoginAPI.as_view()),
    path('api/auth/change_password/', ChangePasswordView.as_view()),
    path('api/auth/user/', UserAPI.as_view()),
    path('api/auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/', include('knox.urls')),

    path('api/accounts/<int:pk>/deactivate/', DeactivateAccount.as_view()),
    path('api/accounts/<int:pk>/activate/', ActiveAccount.as_view()),

    path('api/clients/', ClientsList.as_view()),
    path('api/clients/<int:pk>/', ClientDetail.as_view()),
    path('api/clients/create/', ClientCreate.as_view()),

    path('api/employees/', EmployeesList.as_view()),
    path('api/employees/<int:pk>/', EmployeeDetail.as_view()),
    path('api/employees/create/', EmployeeCreate.as_view()),
]
