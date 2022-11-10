from django.http import HttpResponse
from rest_framework import generics
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate
from django.shortcuts import render, redirect
from .forms import NewUserForm, MySettingPage
from django.contrib.auth import login
from django.contrib import messages
from .serializers import *
from rest_framework.viewsets import ViewSet
from .models import *
from rest_framework.response import Response


def main(request):
    return HttpResponse("Hello")


class Data(generics.ListAPIView):
    queryset = Setting.objects.all()
    serializer_class = MyData
    queryset_predict = PredictCalendar.objects.all()
    serializer_predict = PredictCalendar


def login_request(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, f"You are now logged in as {username}.")
                return redirect("/api/home")
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    form = AuthenticationForm()
    return render(request=request, template_name="registration/login.html", context={"login_form": form})


def register_request(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration successful.")
            return redirect("/api/login")
        messages.error(request, "Unsuccessful registration. Invalid information.")
    form = NewUserForm()
    return render(request=request, template_name="registration/register.html", context={"register_form": form})


def my_form(request):
    if request.method == "POST":
        form = MySettingPage(request.POST)
        if form.is_valid():
            form.save()
    else:
        form = MySettingPage()
    return render(request, 'setting/setting_page.html', {'form': form})


def redirect_line(request):
    # response = redirect('/redirect-success/')
    print(request.GET['code'])
    # collect_state = request.GET['state']
    # url = 'https://notify-bot.line.me/oauth/token'
    # x = requests.post(url=url, json=collect_code)
    # print(x)
    # return HttpResponse('success')


class UploadPredict(ViewSet):
    serializer_class = PredictCalendar

    def get_API(self):
        return Response("GET API")
