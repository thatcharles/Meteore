# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-28 14:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0003_auto_20161228_2159'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='goal',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='totalmembers',
            field=models.IntegerField(default=0, null=True),
        ),
    ]