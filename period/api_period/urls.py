from django.urls import path, include
from .views import *
from rest_framework import routers

load = routers.DefaultRouter()
load.register('upload', UploadPredict, basename="upload")

urlpatterns = [
    path('home', main),
    path('data', Data.as_view()),
    path('login', login_request),
    path('signup', register_request),
    path('setting', my_form),
    path('notification', redirect_line),
    path('', include(load.urls)),
]
