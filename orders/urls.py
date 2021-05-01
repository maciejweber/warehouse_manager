from django.urls import path
from .api import (OrderList, Comments, OrderDetail, Documents)

urlpatterns = [
    path('api/orders/', OrderList.as_view()),
    path('api/orders/<int:pk>/', OrderDetail.as_view()),
    path('api/comments/', Comments.as_view()),
    path('api/documents/', Documents.as_view()),
]
