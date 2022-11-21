from django.urls import path
from . import views

urlpatterns = [
    path('home', views.main),
    path('data', views.Data.as_view()),
    path('diary/id', views.Diary.as_view()),
    path('signup', views.register_request),
    path('login', views.login_request),
    path('setting', views.my_form),
    # path('notification', redirect_line),
    path('get_token', views.GetAccessToken.as_view()),
    path('send_message', views.NotificationCallback.as_view()),
    path('predict', views.predict_date),

]
