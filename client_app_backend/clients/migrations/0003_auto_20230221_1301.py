# Generated by Django 3.2.9 on 2023-02-21 10:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0002_auto_20230221_1235'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clients',
            name='surname',
        ),
        migrations.AlterField(
            model_name='clients',
            name='name',
            field=models.CharField(max_length=500),
        ),
    ]