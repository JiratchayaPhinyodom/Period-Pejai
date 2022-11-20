# from django.test import TestCase
# from django.test import Client
#
#
# class ViewsTestCase(TestCase):
#     """Test that each page has status code = 200 which mean it is ok"""
#
#     def setUp(self):
#         # Every test needs a client.
#         self.client = Client()
#
#     def test_home_page(self):
#         response = self.client.get('/api/home')
#         self.assertEqual(response.status_code, 200)
#
#     def test_data_page(self):
#         response = self.client.get('/api/data')
#         self.assertEqual(response.status_code, 200)
#
#     def test_login_page(self):
#         response = self.client.get('/api/login')
#         self.assertEqual(response.status_code, 200)

# from django.test import TestCase
# from django.urls import reverse
#
# from ..views import *
#
#
# class DataListViewTest(TestCase):
#     @classmethod
#     def setUpTestData(cls):
#         # number_of_data = 10
#         Setting.objects.create(birth_year=2002, period_length=7, cycle_length=28, luteal_length=14)
#         # for i in range(number_of_data):
#         #     Setting.objects.create(
#         #         birth_year=f'birth year {i}',
#         #         period_length=f'period_length {i}',
#         #         cycle_length=f'cycle length {i}',
#         #         luteal_length=f'luteal length {i}',
#         #     )
#
#     def test_view_url_exists_at_desired_location(self):
#         response = self.client.get('/api/data')
#         self.assertEqual(response.status_code, 200)
#
#     def test_lists_all_data(self):
#         # Get second page and confirm it has (exactly) remaining 3 items
#         response = self.client.get('/api/data')
#         self.assertEqual(response.status_code, 200)
#         self.assertTrue('birth_year' in response.context)
#         self.assertTrue(response.context['birth_year'] == True)
#         self.assertEqual(len(response.context['data']), 3)
