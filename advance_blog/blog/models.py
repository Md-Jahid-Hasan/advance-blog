from django.utils.text import slugify
from django.db import models
from django.contrib.auth import get_user_model as User


def get_upload_path(instance, filename):
    blog_id = instance.blog_section.blog.id
    return f"media/{blog_id}/{instance.blog_section.id}_{filename}"


def get_upload_path_for_cover(instance, filename):
    blog_id = instance.id
    filename = slugify(instance.title) + filename[filename.rfind('.'):]
    return f"media/{blog_id}/cover-{filename}"


class Blog(models.Model):
    title = models.CharField(max_length=259)
    author = models.ForeignKey(User(), on_delete=models.SET_NULL, null=True)  # Need to remove null=True
    cover_photo = models.ImageField(upload_to=get_upload_path_for_cover, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class BlogSection(models.Model):
    IMAGE_LAYOUT = [
        ('RE', 'REGULAR'), ('SS', 'SIDE BY SIDE'), ('SL', 'SLIDER')
    ]
    sub_title = models.CharField(max_length=150, null=True)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='content')
    text = models.TextField()
    image_layout = models.CharField(choices=IMAGE_LAYOUT, default="RE", max_length=2, null=True)


class BlogImage(models.Model):
    image = models.ImageField(upload_to=get_upload_path)
    blog_section = models.ForeignKey(BlogSection, on_delete=models.CASCADE, related_name='blog_section_images')
