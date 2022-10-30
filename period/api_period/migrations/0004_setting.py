# Generated by Django 4.1.2 on 2022-10-30 08:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_period', '0003_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Setting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('birth_year', models.IntegerField()),
                ('period_length', models.IntegerField()),
                ('cycle_length', models.IntegerField()),
                ('luteal_length', models.IntegerField()),
            ],
        ),
    ]