from django.urls import path, include
from accounts.api.account import (
    LoginAPI, UserAPI, ChangePasswordView, AccountsList, AccountDetail)
from accounts.api.client import ClientCreate
from knox import views as knox_views

urlpatterns = [
    path('api/auth/login/', LoginAPI.as_view()),
    path('api/auth/change_password/', ChangePasswordView.as_view()),
    path('api/auth/user/', UserAPI.as_view()),
    path('api/auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/', include('knox.urls')),

    path('api/accounts/', AccountsList.as_view()),
    path('api/accounts/<int:pk>/', AccountDetail.as_view()),
]
