from django import forms
from .models import Setting


class MySetting(forms.ModelForm):
    class Meta:
        model = Setting
        fields = ["birth_year", "period_length", "cycle_length", "luteal_length"]
        labels = {"birth_year": "Year of Birth", "period_length": "Period length",
                  "cycle_length": "Cycle length", "luteal length": "Luteal length"}