from django.urls import path
from .views import main, my_form

urlpatterns = [
    path('home', main),
    path('setting', my_form)
]
