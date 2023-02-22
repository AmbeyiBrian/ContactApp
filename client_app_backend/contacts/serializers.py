from rest_framework import serializers
from contacts.models import Contacts, ClientContactLink


class ContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        fields = ('__all__')


class ClientContactLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientContactLink
        fields = ('__all__')


class ClientContactLinkGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientContactLink
        fields = ('__all__')

        depth=1

