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
        fields = ['text', 'sub_title', 'image_layout', 'blog_section_images', 'blog']
        extra_kwargs = {
            'blog': {'required': False}
        }

    def create(self, validated_data):
        section_image = validated_data.pop('blog_section_images')

        blog_section = super().create(validated_data)

        if len(section_image):
            section_image_serializer = BlogImageSerializer(data=section_image, many=True)
            section_image_serializer.is_valid()
            section_image_serializer.save(blog_section=blog_section)

        return blog_section


class BlogSerializer(serializers.ModelSerializer):
    blog_text = BlogSectionSerializer(many=True)

    class Meta:
        model = Blog
        fields = ['title', 'author', 'cover_photo', 'created_at', 'updated_at', 'blog_text']
        read_only_fields = ('created_at', 'updated_at')

    def create(self, validated_data):
        blog_text = validated_data.pop('blog_text')

        blog_section_serializer = BlogSectionSerializer(data=blog_text, many=True)
        blog_section_serializer.is_valid()

        blog = Blog.objects.create(**validated_data)
        blog_section_serializer.save(blog=blog)
        return blog
