from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from blog.models import Blog, BlogImage, BlogSection
from blog.serializers import BlogSerializer

from user.services import UserService


class BlogCreateView(generics.CreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = (AllowAny, )

    def create(self, request, *args, **kwargs):
        data = {"error": "something went wrong"}
        author = request.data.get('user')

        if all(key in author for key in ['email', 'name']):
            return super().create(request, *args, **kwargs)
        else:
            data = {"error": "Name/email not provided"}
        return Response(data=data, status=HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        if self.request.user.is_anonymous:
            author = self.request.data.get('user')
            author = UserService.get_or_create_user(author)
            serializer.save(author=author)
        else:
            serializer.save(self.request.user)


class SingleBlogView(generics.RetrieveAPIView):
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()
    lookup_field = 'id'
