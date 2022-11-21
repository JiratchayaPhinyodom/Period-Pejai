from ..models import Setting, PeriodData
from django.test import TestCase


class SettingModelTest(TestCase):
    """To check the Verbose-name in each model"""
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        Setting.objects.create(birth_year=2002, period_length=7, cycle_length=28, luteal_length=14)

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


class PeriodDataModelTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        PeriodData.objects.create(pain_level=1, blood_level=1, diary_text="Hello",
                                start_date="2022-11-15T17:14:00+07:00"
                                , end_date="2022-11-27T17:14:00+07:00", uid="abc1234",
                                date="2022-11-19T17:14:00+07:00")

    def test_pain_level_label(self):
        """Checking Verbose-name 'pain level' """
        period = PeriodData.objects.get(id=1)
        field_label = period._meta.get_field('pain_level').verbose_name
        self.assertEqual(field_label, 'pain level')

    def test_blood_level_label(self):
        """Checking Verbose-name 'blood level' """
        period = PeriodData.objects.get(id=1)
        field_label = period._meta.get_field('blood_level').verbose_name
        self.assertEqual(field_label, 'blood level')

    def test_diary_text_max_length(self):
        """Checking the maximum length of the diary_text"""
        period_data = PeriodData.objects.get(id=1)
        max_length = period_data._meta.get_field('diary_text').max_length
        self.assertEqual(max_length, 1000)
