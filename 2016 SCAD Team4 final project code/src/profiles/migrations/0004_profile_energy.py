# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-01-03 11:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_auto_20170102_2117'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='energy',
            field=models.IntegerField(default=0),
        ),
    ]
