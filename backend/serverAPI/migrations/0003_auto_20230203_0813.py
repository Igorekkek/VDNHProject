# Generated by Django 3.1.4 on 2023-02-03 05:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('serverAPI', '0002_auto_20230203_0808'),
    ]

    operations = [
        migrations.RenameField(
            model_name='travelroute',
            old_name='used',
            new_name='user',
        ),
    ]