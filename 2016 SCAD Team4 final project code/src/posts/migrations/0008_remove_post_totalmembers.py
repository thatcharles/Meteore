# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-28 14:41
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0007_auto_20161228_2236'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='totalmembers',
        ),
    ]
