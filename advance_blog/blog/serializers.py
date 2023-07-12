from rest_framework import serializers
from .models import Blog, BlogSection, BlogImage


class BlogImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogImage
        fields = '__all__'


class BlogSectionSerializer(serializers.ModelSerializer):
    blog_section_images = BlogImageSerializer(many=True, required=False)

    class Meta:
        model = BlogSection
        fields = ['text', 'image_layout', 'blog_section_images', 'blog']
        extra_kwargs = {
            'blog': {'required': False}
        }


class BlogSerializer(serializers.ModelSerializer):
    blog_text = BlogSectionSerializer(many=True)

    class Meta:
        model = Blog
        fields = ['title', 'author', 'cover_photo', 'created_at', 'updated_at', 'blog_text']
        read_only_fields = ('created_at', 'updated_at')

    def create(self, validated_data):
        blog_text = validated_data.pop('blog_text')
        blog = Blog.objects.create(**validated_data)

        blog_section_serializer = BlogSectionSerializer(data=blog_text, many=True)
        blog_section_serializer.is_valid()
        blog_section_serializer.save(blog=blog)
        return blog
