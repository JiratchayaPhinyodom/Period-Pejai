from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from ..models import *
from ..urls import *


class TestDataPage(APITestCase):
    def setUp(self):
        self.data = {'birth_year': 2002, 'period_length': 7, 'cycle_length': 28, 'luteal_length': 14}

    def test_get_data_page(self):
        response = self.client.get('/api/data')
        self.assertEqual(response.status_code, 200)

    def test_post_data_page(self):
        response = self.client.post('/api/data', self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestHomePage(APITestCase):
    def setUp(self):
        self.data = {'pain_level': 1, 'blood_level': 1, 'diary_text': "Hello",
                     'start_date': "2022-11-15T17:14:00+07:00",
                     'end_date': "2022-11-27T17:14:00+07:00", 'uid': "abc1234",
                     'date': "2022-11-19T17:14:00+07:00"}

    def test_get_data_page(self):
        response = self.client.get('/api/diary')
        self.assertEqual(response.status_code, 200)

    def test_post_data_page(self):
        response = self.client.post('/api/diary', self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


# class DataViewSet(APITestCase):
#     def setUp(self):
#         # Set up non-modified objects used by all test methods
#         self.data = Setting.objects.create(birth_year=2002, period_length=7, cycle_length=28, luteal_length=14)
#
#     def test_data_detail(self):
#         response = self.client.get('/api/data', kwargs={"pk": 1})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data['birth_year'], 2002)
