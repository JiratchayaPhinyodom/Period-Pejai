import json
from django.test import TestCase
from rest_framework.reverse import reverse
from .models import Setting
from django.test import Client
from rest_framework.test import APITestCase


class ModelSettingTestCase(TestCase):
    pass


class ViewsTestCase(TestCase):
    """Test that each page has status code = 200 which mean it is ok"""
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_home_page(self):
        response = self.client.get('/api/home')
        self.assertEqual(response.status_code, 200)

    def test_setting_page(self):
        response = self.client.get('/api/setting')
        self.assertEqual(response.status_code, 200)

    def test_login_page(self):
        response = self.client.get('/api/login')
        self.assertEqual(response.status_code, 200)


# class SerializesTestCase(TestCase):
#     def test_contains_setting(self):


# class TestDataAPIView(APITestCase):
#     def test_create_account(self):
#         """
#         Ensure we can create a new account object.
#         """
#         url = reverse('account-list')
#         data = {'name': 'DabApps'}
#         json.dumps(data)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response.data, data)
