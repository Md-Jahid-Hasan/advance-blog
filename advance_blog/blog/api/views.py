import json

from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED

from blog.models import Blog, BlogImage, BlogSection
from blog.serializers import BlogSerializer, BlogListSerializer

from user.services import UserService

class BlogListCreateView(generics.ListCreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = (AllowAny,)
    queryset = Blog.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BlogSerializer
        return BlogListSerializer

    def create(self, request, *args, **kwargs):
        data = {"error": "something went wrong"}
        payload = {"title": request.data.get('title'), "cover_photo": request.data.get('cover_photo')}

        contents = json.loads(request.data.get('content'))

        for section in contents:
            images = section.pop('image_refs', [])
            if len(images) > 0:
                section['blog_section_images'] = []
                for image in images:
                    section['blog_section_images'].append({"image": request.data.pop(image)[0]})
        author = request.data.get('user')
        payload['content'] = contents
        print(payload)
        serializer = self.get_serializer(data=payload)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)

        # if all(key in author for key in ['email', 'name']):
        #     return super().create(request, *args, **kwargs)
        # else:
        #     data = {"error": "Name/email not provided"}
        # return Response(data=data, status=HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        if self.request.user.is_anonymous:
            # author = self.request.data.get('user')
            author = {"email": "jahidhadiu@gmail.com", "name": "jahid"}
            author = UserService.get_or_create_user(author)
            serializer.save(author=author)
        else:
            serializer.save(self.request.user)
