# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-01-04 10:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0006_profile_is_new'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='starColor',
            field=models.CharField(blank=True, default='White', max_length=30),
        ),
    ]
