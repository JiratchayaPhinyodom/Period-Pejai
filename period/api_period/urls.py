from django.urls import path
from .views import *

urlpatterns = [
    path('home', main),
    path('data', Data.as_view()),
    path('login', login_request),
    path('signup', register_request),
    path('setting', my_form)
]
