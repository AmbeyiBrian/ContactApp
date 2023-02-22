from rest_framework import serializers
from clients.models import Clients


class ClientsSerializer(serializers.ModelSerializer):  # serializer class to create a general user
    class Meta:
        model = Clients
        fields = ('__all__')

