# Generated by Django 3.2.9 on 2023-02-21 15:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0003_alter_contacts_email_address'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contacts',
            name='client',
        ),
    ]
