# Generated by Django 3.0.3 on 2020-03-03 14:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0009_auto_20200303_1421'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogpage',
            name='url',
        ),
    ]
