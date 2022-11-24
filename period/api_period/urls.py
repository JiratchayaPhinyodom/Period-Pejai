from .views import *
from django.urls import path
from . import views

urlpatterns = [
    path('home', main),
    path('data', Data.as_view()),
    path('diary', my_diary),
    path('period', my_period),
    path('signup', register_request),
    path('login', login_request),
    path('setting', my_form),
    path('notification', redirect_line),
    path('get_token', views.GetAccessToken.as_view()),
    # path('send_message', views.NotificationCallback.as_view()),
    path('predict', views.predict_date),
    path('luteal', views.predict_luteal),
    path('ping', views.ping),
]
