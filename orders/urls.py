from django.urls import path
from .api import (OrderList, CommentList, OrderDetail, DocumentList)

urlpatterns = [
    path('api/orders/', OrderList.as_view()),
    path('api/orders/<int:pk>/', OrderDetail.as_view()),
    path('api/comments/', CommentList.as_view()),
    path('api/documents/', DocumentList.as_view()),
]
