# Generated by Django 3.0.3 on 2020-03-03 14:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0008_blogpage_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpage',
            name='url',
            field=models.URLField(default='http://www.foo.com'),
        ),
    ]
