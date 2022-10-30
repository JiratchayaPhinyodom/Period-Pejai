# Create your models here.
import random
import string

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import datetime


class HomePage(models.Model):
    """Home Page model"""
    diary_text = models.CharField(max_length=400)
    blood_level = models.DateTimeField('store blood level')
    pain_level = models.DateTimeField('store pain level')
    current_period = True

    def can_choose(self) -> bool:
        """For checking the date that user has period"""
        if not self.current_period:
            return False

    def __str__(self):
        return self.diary_text


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Setting.objects.filter(code=code).count() == 0:
            break
    return code


class Setting(models.Model):
    birth_year = models.IntegerField()
    period_length = models.IntegerField()
    cycle_length = models.IntegerField()
    luteal_length = models.IntegerField()
