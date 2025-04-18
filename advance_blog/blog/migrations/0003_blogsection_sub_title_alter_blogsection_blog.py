# Generated by Django 5.2 on 2025-04-10 05:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_blog_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogsection',
            name='sub_title',
            field=models.CharField(max_length=150, null=True),
        ),
        migrations.AlterField(
            model_name='blogsection',
            name='blog',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='content', to='blog.blog'),
        ),
    ]
