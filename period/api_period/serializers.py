from rest_framework import serializers
from .models import Setting


class MySetting(serializers.ModelSerializer):
    class Meta:
        model = Setting
        fields = ["birth_year", "period_length", "cycle_length", "luteal_length"]
