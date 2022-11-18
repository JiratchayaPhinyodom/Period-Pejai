from .views import *
from django.urls import path
from . import views

urlpatterns = [
    path('home', main),
    path('data', Data.as_view()),
    path('diary/id', Diary.as_view()),
    path('signup', register_request),
    path('login', login_request),
    path('setting', my_form),
    path('notification', redirect_line),
    path('predict', views.predict_date),
]
