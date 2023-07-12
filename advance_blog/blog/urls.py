from django.urls import path, include
from .views import BlogCreateView

app_name = 'blog'

urlpatterns = [
    path('create/', BlogCreateView.as_view())
]