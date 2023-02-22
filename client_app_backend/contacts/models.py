from django.db import models
from clients.models import Clients


class Contacts(models.Model):
    name = models.CharField(max_length=50, null=True)
    surname = models.CharField(max_length=50, null=True)
    email_address = models.EmailField(max_length=50)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{}'.format(self.email_address)

    class Meta:
        verbose_name_plural = 'Contacts'


class ClientContactLink(models.Model):
    client = models.ForeignKey(Clients, on_delete=models.CASCADE)
    contact = models.ForeignKey(Contacts, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{} {}'.format(self.client, self.contact)
