from .views import *
from django.urls import path, include
from rest_framework import routers
from .views import UploadPicture

load = routers.DefaultRouter()
load.register('upload', UploadPredict, basename='upload')

urlpatterns = [
    path('home', main),
    path('data', Data.as_view()),
    path('login', login_request),
    path('signup', register_request),
    path('', include(load.urls)),  # api/upload/
    path('setting', my_form),
    path('notification', redirect_line),
]
