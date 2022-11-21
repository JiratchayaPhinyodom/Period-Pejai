from rest_framework.serializers import Serializer, FileField


class UploadFile(Serializer):
    file_uploaded = FileField()

    class Meta:
        fields = ['file_uploaded']


from rest_framework import serializers
from .models import *


class MyData(serializers.ModelSerializer):
    """To see the data in database file"""

    class Meta:
        model = Setting
        fields = ["birth_year", "period_length", "cycle_length", "luteal_length", "uid"]


class MyDiaryPage(serializers.ModelSerializer):
    class Meta:
        model = PeriodData
        fields = ["pain_level", "blood_level", "diary_text", "uid", "date"]
        

class MyPeriod(serializers.ModelSerializer):
    class Meta:
        model = DateRange
        fields = ["period_phase", "uid"]
