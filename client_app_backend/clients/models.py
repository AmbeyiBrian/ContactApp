from django.db import models


class Clients(models.Model):
    name = models.CharField(max_length=500)
    client_code = models.CharField(unique=True, max_length=50)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{}'.format(self.name)

    class Meta:
        verbose_name_plural = 'Clients'
        unique_together = ['name', 'client_code']
