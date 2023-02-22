from django.contrib import admin
from clients.models import Clients


class ClientsAdmin(admin.ModelAdmin):
    admin.site.register(Clients)
