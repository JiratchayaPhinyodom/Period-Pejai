from django.urls import path
from .views import *

urlpatterns = [
    path('home', main),
    path('setting', MyForm.as_view()),
    path('login', login_request),
    path('signup', register_request)
]
