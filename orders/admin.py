from django.contrib import admin
from .models import Order, Comment, Documents

admin.site.register(Order)
admin.site.register(Comment)
admin.site.register(Documents)
