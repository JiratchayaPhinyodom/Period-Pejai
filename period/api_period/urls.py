from .views import main, Data, my_diary, \
    my_period, register_request, login_request, \
    Notification, my_form
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
    path('notification', Notification.as_view()),
    path('get_token', views.GetAccessToken.
         as_view()),
    path('predict', views.predict_date),
    path('luteal', views.predict_luteal),
    path('ping', views.ping),
]
