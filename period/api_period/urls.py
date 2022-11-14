from .views import *
from django.urls import path, include
from rest_framework import routers
from .views import UploadPicture

upload = routers.DefaultRouter()
upload.register('upload', UploadPicture, basename="upload")

urlpatterns = [
    path('home', main),
    path('data', Data.as_view()),
    path('login', login_request),
    path('signup', register_request),
    path('', include(upload.urls)),  # api/upload/
    path('setting', my_form),
    path('notification', redirect_line),
]
