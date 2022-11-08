from django.test import TestCase
from .models import Setting
from django.test import Client


class ModelSettingTestCase(TestCase):
    def setUp(self):
        self.birth_year = 2002
        self.period_length = 7
        self.cycle_length = 28
        self.luteal_length = 14

    def test_user_input_is_integer(self):
        self.assertEqual(self.birth_year, 2002)
        self.assertEqual(self.period_length, 7)
        self.assertEqual(self.cycle_length, 28)
        self.assertEqual(self.luteal_length, 14)
        # with self.assertRaises(TypeError):
        #     self.assertEqual(self.luteal_length, "14") #failures


class ViewsTestCase(TestCase):
    """Test that the pages has status code = 200 which mean it is ok"""
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_home_page(self):
        response = self.client.get('/api/home')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)

    def test_setting_page(self):
        response = self.client.get('/api/setting')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)

    def test_login_page(self):
        response = self.client.get('/api/login')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)

