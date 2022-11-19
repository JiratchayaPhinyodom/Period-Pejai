import random
import string
import datetime
from django.db import models
from django.conf import settings


def today():
    return datetime.datetime.now()


class PeriodData(models.Model):
    """Home Page model"""
    diary_text = models.CharField(max_length=1000, default="")
    blood_level = models.IntegerField(default=0)
    pain_level = models.IntegerField(default=0)
    uid = models.CharField(max_length=1000, default="") # user uid
    date = models.TextField(max_length=1000, default="") # current selected date

    def __str__(self):
        return self.diary_text
    

class DateRange(models.Model):
    period_phase = models.CharField(max_length=1000, default="")
    uid = models.CharField(max_length=1000, default="")
    


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Setting.objects.filter(code=code).count() == 0:
            break
    return code


class Setting(models.Model):
    """To correct data from user in setting page"""
    birth_year = models.IntegerField()
    period_length = models.IntegerField()
    cycle_length = models.IntegerField()
    luteal_length = models.IntegerField()
