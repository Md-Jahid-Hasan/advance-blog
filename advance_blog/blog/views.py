from django.views.generic.base import TemplateView


class CreateBlogTemplate(TemplateView):
    template_name = 'blog/create.html'
