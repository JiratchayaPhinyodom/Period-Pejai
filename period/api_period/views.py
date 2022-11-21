from django.http import HttpResponse, JsonResponse
from rest_framework import generics
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate
from django.shortcuts import render, redirect
from .forms import NewUserForm, MySettingPage, MyHomePage
from django.contrib.auth import login
from django.contrib import messages
from .models import *
from rest_framework.response import Response
from .serializers import MyData, MyDiaryPage
from rest_framework import status
from rest_framework.decorators import api_view
from .line_notify import *
from django.views import generic


def main(request):
    return HttpResponse("Hello")


class Data(generics.ListCreateAPIView):
    queryset = Setting.objects.all()
    serializer_class = MyData
    queryset_period = PeriodData.objects.all()
    serializer_period = MyHomePage


class Diary(generics.ListCreateAPIView):
    queryset = PeriodData.objects.all()
    serializer_class = MyHomePage


def predict_date(request):
    if request.method == "GET":
        list_data = []
        for i in request.data["date"]:
            first_day = i[0]
            setting_data = Setting.objects.filter(uid=request.data["uid"])
            first_day += setting_data.period_length
            list_data.append(first_day)
        data = list_data
        return JsonResponse({"result": data})


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


@api_view(['POST'])
def my_form(request):
    print(request.data)
    print(type(request.data))
    if request.method == "POST":
        form = MySettingPage(request.data)
        if form.is_valid():
            form.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'GET', 'PUT'])
def my_diary(request):
    print(request.data)
    print(type(request.data))
    if request.method == "POST":
        form = MyHomePage(request.data)
        if form.is_valid():
            form.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    # try/except
    elif request.method == "PUT":
        period_data = PeriodData.objects.get(uid=request.data["uid"], date=request.data["date"])
        print(period_data)
        form = MyHomePage(request.data)
        period_data.pain_level = request.data["pain_level"]
        period_data.blood_level = request.data["blood_level"]
        period_data.diary_text = request.data["diary_text"]
        period_data.start_date = request.data["start_date"]
        period_data.end_date = request.data["end_date"]
        period_data.save()
        return Response(status=status.HTTP_201_CREATED)  # or 204 -> recheck
    elif request.method == "GET":
        diary = PeriodData.objects.all()
        serializer = MyDiaryPage(diary, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


def redirect_line(request):
    # response = redirect('/redirect-success/')
    print(request.GET['code'])
    # collect_state = request.GET['state']
    # url = 'https://notify-bot.line.me/oauth/token'
    # x = requests.post(url=url, json=collect_code)
    # print(x)
    # return HttpResponse('success')
    pass


# def request():
#     code = "fPg7tfstCUlDW5s5TiAha5"
#     client_id = "3i37SxxITCH1t4ngUNAPuz"
#     url = "http://127.0.0.1:8000/api/setting"
#     state = "abcdef123456"
#     token = "IYsi0yC9Et4EqFHBzv9evCyN1azoebOgKkyU4UygHwj"
#     headers = {'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + token}
#     msg = 'Hello LINE Notify'
#     r = requests.post(url, headers=headers, data={'message': msg})
#     print(r.text)
#

def response(code):
    code = ""
    state = ""
    pass


# LineView จะต้องเอาไปเขียน class เพื่อใช้ส่งข้อความว่าจะส่งไปวันไหน
# class LineView(generics.DetailCreateAPIView): 

#     def get(self, request, *args, **kwargs):
#         url = "https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=FoxpwP1XQ9OX0RXJXT8Ju5" \
#                       "&redirect_uri=http://localhost:3000/&scope=notify&state=period "
#         return HttpResponseRedirect(url)


# Get code กลับมา
# class NotificationCallback(generics.Detail.View):
#     """A class that handles the callback after user authorize notification."""

#     def get(self, request, *args, **kwargs):
#         code = request.GET['code'] # get the code ได้โค้ดไปใส่ใน get access token

class GetAccessToken(generic.DetailView):
    def get(self, request, *args, **kwargs):
        code = request.data["code"]
        token = get_access_token(code)
        return JsonResponse({"token": token})


class NotificationCallback(generic.DetailView):
    """A class that handles the callback after user authorize notification."""

    def get(self, request, *args, **kwargs):
        token = request.data['token']
        message = request.data["message"]  # get the code ได้โค้ดไปใส่ใน get access token
        send_notification(message, token)
