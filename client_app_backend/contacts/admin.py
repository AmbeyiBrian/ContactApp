from django.contrib import admin
from contacts.models import Contacts, ClientContactLink


class ContactsAdmin(admin.ModelAdmin):
    admin.site.register(Contacts)


class ClientContactLinkAdmin(admin.ModelAdmin):
    admin.site.register(ClientContactLink)
