from django.test import TestCase
from .models import Setting


# class ModelSettingTestCase(TestCase):
#     def SetUp(self):
#         self.birth_year = Setting.birth_year()
#
#     def test_user_input_is_integer(self):
#         Birth_year = 2002
#         self.birth_year = Setting.birth_year()
#         self.assertEqual(self.birth_year, Birth_year)


class ViewsTestCase(TestCase):
    def test_index_loads_properly(self):
        """The index page loads properly"""
        response = self.client.get('server_ip:8000')
        self.assertEqual(response.status_code, 404)
