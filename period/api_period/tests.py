from django.test import TestCase
from .models import Setting


# Create your tests here.
class SettingModelTests(TestCase):

    def test_uses_setting_template(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'setting/setting_page.html')
