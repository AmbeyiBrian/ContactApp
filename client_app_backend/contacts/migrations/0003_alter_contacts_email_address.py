# Generated by Django 3.2.9 on 2023-02-21 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0002_auto_20230221_1828'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contacts',
            name='email_address',
            field=models.EmailField(max_length=50),
        ),
    ]
