# Generated by Django 4.1.7 on 2023-02-14 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('serverAPI', '0004_auto_20230203_1745'),
    ]

    operations = [
        migrations.AddField(
            model_name='travelroute',
            name='time',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='travelroute',
            name='way_len',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
