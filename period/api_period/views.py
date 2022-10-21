from django.shortcuts import render
from django.http import HttpResponse
from .forms import MySetting


# Create your views here.

def main(request):
    return HttpResponse("Hello")


def my_form(request):
    if request.method == "POST":
        form = MySetting(request.POST)
        if form.is_valid():
            form.save()
    else:
        form = MySetting()
    return render(request, 'setting/setting_page.html', {'form': form})
