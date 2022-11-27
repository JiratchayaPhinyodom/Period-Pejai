from ..models import Setting
from django.test import TestCase


class SettingModelTest(TestCase):
    """To check the Verbose-name in each model"""

    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        Setting.objects.create(birth_year=2002, period_length=7,
                               cycle_length=28, luteal_length=14,
                               uid="6FzQ7n2JRQfygAwkXpKhJOfa83v2")

    def test_birth_year_label(self):
        """Checking Verbose-name 'birth year' """
        setting = Setting.objects.get(id=1)
        field_label = setting._meta.get_field('birth_year').verbose_name
        self.assertEqual(field_label, 'birth year')

    def test_period_length_label(self):
        """Checking Verbose-name 'period length' """
        setting = Setting.objects.get(id=1)
        field_label = setting._meta.get_field('period_length').verbose_name
        self.assertEqual(field_label, 'period length')

    def test_cycle_length_label(self):
        """Checking Verbose-name 'cycle length' """
        setting = Setting.objects.get(id=1)
        field_label = setting._meta.get_field('cycle_length').verbose_name
        self.assertEqual(field_label, 'cycle length')

    def test_luteal_length_label(self):
        """Checking Verbose-name 'luteal length' """
        setting = Setting.objects.get(id=1)
        field_label = setting._meta.get_field('luteal_length').verbose_name
        self.assertEqual(field_label, 'luteal length')

    def test_uid_label(self):
        """Checking Verbose-name 'luteal length' """
        setting = Setting.objects.get(id=1)
        field_label = setting._meta.get_field('uid').verbose_name
        self.assertEqual(field_label, 'uid')
