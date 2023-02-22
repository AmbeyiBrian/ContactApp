from rest_framework.views import APIView
from rest_framework.response import Response
from contacts.models import Contacts, ClientContactLink
from contacts.serializers import ContactsSerializer, ClientContactLinkSerializer, ClientContactLinkGetSerializer


class postAPI(APIView):
    permission_classes = ()
    serializer_class = ContactsSerializer

    def post(self, request):
        serializer = ContactsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class getAPI(APIView):
    permission_classes = ()

    def get(self, request, email):
        contacts = Contacts.objects.filter(email=email).order_by('-id')
        serializer = ContactsSerializer(contacts, many=True)
        return Response(serializer.data)


class getAllAPI(APIView):
    permission_classes = ()

    def get(self, request):
        contacts = Contacts.objects.all().order_by('surname', 'name')
        serializer = ContactsSerializer(contacts, many=True)
        return Response(serializer.data)


class deleteAPI(APIView):
    permission_classes = ()

    def get(self, request, id):
        contact = ContactsSerializer.objects.get(id=id)
        serializer = ContactsSerializer(contact)
        contact.delete()
        return Response(serializer.data)


class postContactClientLinkAPI(APIView):
    permission_classes = ()
    serializer_class = ClientContactLinkSerializer

    def post(self, request):
        serializer = ClientContactLinkSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer)
        return Response(serializer.errors)


class getContactClientLinkAllAPI(APIView):
    permission_classes = ()

    def get(self, request):
        contactsClientLinks = ClientContactLink.objects.all().order_by('contact__surname', 'contact__name')
        serializer = ClientContactLinkGetSerializer(contactsClientLinks, many=True)
        return Response(serializer.data)


class deleteContactClientLinkAPI(APIView):
    permission_classes = ()

    def get(self, request, id):
        contactClient = ClientContactLink.objects.get(id=id)
        serializer = ClientContactLinkGetSerializer(contactClient)
        contactClient.delete()
        return Response(serializer.data)