from django.contrib import admin
from orders.models.order import Order
from orders.models.comment import Comment
from orders.models.document import Document

admin.site.register(Order)
admin.site.register(Comment)
admin.site.register(Document)
