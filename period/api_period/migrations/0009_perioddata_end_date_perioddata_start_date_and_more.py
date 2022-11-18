# Generated by Django 4.1.2 on 2022-11-18 05:38

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api_period", "0008_alter_perioddata_blood_level_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="perioddata",
            name="end_date",
            field=models.DateTimeField(
                default=datetime.datetime(2022, 11, 18, 12, 38, 41, 61568)
            ),
        ),
        migrations.AddField(
            model_name="perioddata",
            name="start_date",
            field=models.DateTimeField(
                default=datetime.datetime(2022, 11, 18, 12, 38, 41, 61558)
            ),
        ),
        migrations.AlterField(
            model_name="predictcalendar",
            name="start_time",
            field=models.DateTimeField(
                default=datetime.datetime(2022, 11, 18, 12, 38, 41, 61801)
            ),
        ),
    ]
