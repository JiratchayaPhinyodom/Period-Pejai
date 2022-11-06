from rest_framework import serializers
from .models import Setting


class MyData(serializers.ModelSerializer):
    """To see the data in database file"""
    class Meta:
        model = Setting
        fields = ["birth_year", "period_length", "cycle_length", "luteal_length"]
