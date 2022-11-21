from rest_framework.test import APITestCase
from ..urls import *


class TestDataAPIViewTests(APITestCase):
    """To check get/post in data page """

    def setUp(self):
        self.data = {'birth_year': 2002, 'period_length': 7, 'cycle_length': 28, 'luteal_length': 14}

    def test_get_data(self):
        """Test can get /api/data """
        response = self.client.get('/api/data')
        self.assertEqual(response.status_code, 200)

    def test_post_data(self):
        """Test /api/data can post, also checking len of data"""
        response = self.client.post('/api/data', self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(response.data), 4)


class TestDataDetailAPIViewTests(APITestCase):
    def setUp(self):
        self.data = {'birth_year': 2002, 'period_length': 7, 'cycle_length': 28, 'luteal_length': 14}
        self.client.post(
            self.client.get('/api/data'), self.data, format='json')

    def test_post_detail_birth_year(self):
        """Test can post birth_year"""
        response = self.client.post('/api/data', self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["birth_year"], 2002)

    def test_post_detail_period_length(self):
        """Test can post period_length"""
        response = self.client.post('/api/data', self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["period_length"], 7)

    def test_post_detail_cycle_length(self):
        """Test can post cycle_length"""
        response = self.client.post('/api/data', self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["cycle_length"], 28)

    def test_post_detail_luteal_length(self):
        """Test can post luteal_length"""
        response = self.client.post('/api/data', self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["luteal_length"], 14)

