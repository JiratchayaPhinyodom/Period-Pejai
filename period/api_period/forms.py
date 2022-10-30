from django import forms
from .models import Setting
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class MySettingPage(forms.ModelForm):
    class Meta:
        model = Setting
        fields = ["birth_year", "period_length", "cycle_length", "luteal_length"]
        labels = {"birth_year": "Year of Birth", "period_length": "Period length",
                  "cycle_length": "Cycle length", "luteal length": "Luteal length"}


class NewUserForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super(NewUserForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return
