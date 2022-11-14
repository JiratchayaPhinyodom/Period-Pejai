from .views import *
from django.urls import path, include
from rest_framework import routers
from .views import UploadPicture

urlpatterns = [
    path('home', main),
    path('data', Data.as_view()),
    path('login', login_request),
    path('signup', register_request),
    path('', include(upload.urls)),  # api/upload/
    path('setting', my_form),
    path('notification', redirect_line),
    path('', include(load.urls)),
]
