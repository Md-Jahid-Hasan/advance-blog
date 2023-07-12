from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Blog, BlogImage, BlogSection
from .serializers import BlogSerializer


class BlogCreateView(generics.CreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = (AllowAny, )
