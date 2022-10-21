from django.urls import path
from .views import *

urlpatterns = [
    path('home', main),
    path('setting', my_form),
    path('login', login_request),
    path('signup', register_request)
]
