# from rest_framework.test import APITestCase
# from ..urls import *
#
#
# class TestHomePageAPIViewTests(APITestCase):
#     """To check get/post in home page """
#
#     def setUp(self):
#         self.data = {'pain_level': 1, 'blood_level': 1, 'diary_text': "Hello",
#                      'start_date': "2022-11-15T17:14:00+07:00",
#                      'end_date': "2022-11-27T17:14:00+07:00", 'uid': "abc1234",
#                      'date': "2022-11-19T17:14:00+07:00"}
#
#     def test_get_diary_page(self):
#         """Test can get /api/diary"""
#         response = self.client.get('/api/diary')
#         self.assertEqual(response.status_code, 200)
#
#     def test_post_diary(self):
#         """Test /api/diary can post, also checking len of data"""
#         response = self.client.post('/api/diary', self.data)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(len(response.data), 7)
#
#
# class TestDiaryDetailAPIViewTests(APITestCase):
#     def setUp(self):
#         self.data = {'pain_level': 1, 'blood_level': 1, 'diary_text': "Hello",
#                      'start_date': "2022-11-15T17:14:00+07:00",
#                      'end_date': "2022-11-27T17:14:00+07:00", 'uid': "abc1234",
#                      'date': "2022-11-19T17:14:00+07:00"}
#         self.client.post(
#             self.client.get('/api/diary'), self.data, format='json')
#
#     def test_post_detail_pain_level(self):
#         """Test can post pain level"""
#         response = self.client.post('/api/diary', self.data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response.data["pain_level"], 1)
#
#     def test_post_detail_blood_level(self):
#         """Test can post blood level"""
#         response = self.client.post('/api/diary', self.data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response.data["blood_level"], 1)
#
#     def test_post_detail_diary_text(self):
#         """Test can post diary text"""
#         response = self.client.post('/api/diary', self.data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response.data["diary_text"], "Hello")
#
#     def test_post_detail_start_date(self):
#         """Test can post start date"""
#         response = self.client.post('/api/diary', self.data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response.data["start_date"], "2022-11-15T17:14:00+07:00")
#
#     def test_post_detail_end_date(self):
#         """Test can post end date"""
#         response = self.client.post('/api/diary', self.data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response.data["end_date"], "2022-11-27T17:14:00+07:00")
#
#     def test_post_detail_uid(self):
#         """Test can post uid"""
#         response = self.client.post('/api/diary', self.data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response.data["uid"], "abc1234")
#
#     def test_post_detail_date(self):
#         """Test can post date"""
#         response = self.client.post('/api/diary', self.data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response.data["date"], "2022-11-19T17:14:00+07:00")
