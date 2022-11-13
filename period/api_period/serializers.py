from rest_framework.serializers import Serializer, FileField
from rest_framework import serializers
from .models import Setting, PeriodData


class UploadFile(Serializer):
    file_uploaded = FileField()

    class Meta:
        fields = ['file_uploaded']


class MyData(serializers.ModelSerializer):
    """To see the data in database file"""

    class Meta:
        model = Setting
        fields = ["birth_year", "period_length", "cycle_length", "luteal_length"]


class MyDiaryPage(serializers.ModelSerializer):
    class Meta:
        model = PeriodData
        fields = ["pain_level", "blood_level", "diary_text"]