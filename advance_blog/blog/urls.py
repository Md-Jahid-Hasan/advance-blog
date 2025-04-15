from django.urls import path
from blog.api.views import BlogListCreateView
from .views import CreateBlogTemplate

app_name = 'blog'

urlpatterns = [
    path('', BlogListCreateView.as_view(), name="blog_list_create_api"),
    path('blog-create/', CreateBlogTemplate.as_view(), name="blog_create_template")
]