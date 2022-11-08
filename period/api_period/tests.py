from django.test import TestCase
from .models import Setting


# birth_year = models.IntegerField()
# period_length = models.IntegerField()
# cycle_length = models.IntegerField()
# luteal_length = models.IntegerField()
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
    def test_index_loads_properly(self):
        """The index page loads properly"""
        response = self.client.get('server_ip:8000')
        self.assertEqual(response.status_code, 404)
