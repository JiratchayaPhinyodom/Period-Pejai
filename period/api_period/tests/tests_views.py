from django.test import TestCase
from django.test import Client


class ViewsTestCase(TestCase):
    """Test that each page has status code = 200 which mean it is ok"""

    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_home_page(self):
        response = self.client.get('/api/home')
        self.assertEqual(response.status_code, 200)

    def test_data_page(self):
        response = self.client.get('/api/data')
        self.assertEqual(response.status_code, 200)

    def test_login_page(self):
        response = self.client.get('/api/login')
        self.assertEqual(response.status_code, 200)
