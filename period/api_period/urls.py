from .views import *
from django.urls import path, include

from rest_framework import routers


urlpatterns = [
    path('home', main),
    path('data', Data.as_view()),

    path('diary', my_diary),

    path('login', login_request),
    path('signup', register_request),
    path('setting', my_form),
    path('notification', redirect_line),
]
