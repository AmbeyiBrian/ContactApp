# Generated by Django 3.2.9 on 2023-02-21 15:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0003_auto_20230221_1301'),
        ('contacts', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contacts',
            old_name='phone_number',
            new_name='email_address',
        ),
        migrations.CreateModel(
            name='ClientContactLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clients.clients')),
                ('contact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contacts.contacts')),
            ],
        ),
    ]
