import random
import string
import datetime
from django.db import models
from django.conf import settings


def today():
    return datetime.datetime.now()


class PeriodData(models.Model):
    """Home Page model"""
    diary_text = models.CharField(max_length=1000)
    blood_level = models.IntegerField()
    pain_level = models.IntegerField()
    # date = models.DateTimeField(default=today())
    # current_period = True
    # period_day = models.CharField(max_length=10)
    #
    # def can_choose(self) -> bool:
    #     """For checking the date that user has period"""
    #     if not self.current_period:
    #         return False

    # def __str__(self):
    #     return self.diary_text


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


class PredictCalendar(models.Model):
    start_time = models.DateTimeField(default=today())
    setting = models.ForeignKey(Setting, on_delete=models.DO_NOTHING)

    def get_predict(self, day: datetime, setting: Setting) -> list:
        pass

