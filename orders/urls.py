from django.urls import path
from orders.api.order import OrderList, OrderDetail
from orders.api.comment import Comments, CommentDestroy
from orders.api.document import Documents

urlpatterns = [
    path('api/orders/', OrderList.as_view()),
    path('api/orders/<int:pk>/', OrderDetail.as_view()),
    path('api/comments/', Comments.as_view()),
    path('api/comments/<int:pk>/', CommentDestroy.as_view()),
    path('api/documents/', Documents.as_view()),
]
