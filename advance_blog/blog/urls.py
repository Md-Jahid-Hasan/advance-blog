from django.urls import path
from blog.api.views import BlogCreateView
from .views import CreateBlogTemplate

app_name = 'blog'

urlpatterns = [
    path('create/', BlogCreateView.as_view(), name="blog_create_api"),
    path('blog-create/', CreateBlogTemplate.as_view(), name="blog_create_template")
]