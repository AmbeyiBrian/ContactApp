from rest_framework.views import APIView
from rest_framework.response import Response
from clients.models import Clients
from clients.serializers import ClientsSerializer


class postAPI(APIView):
    permission_classes = ()
    serializer_class = ClientsSerializer

    def post(self, request):
        print(request.data)
        serializer = ClientsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.error_messages)
        return Response(serializer.errors)


class getAPI(APIView):
    permission_classes = ()

    def get(self, request, shop):
        sales = Clients.objects.filter(shop=shop).order_by('-id')
        serializer = ClientsSerializer(sales, many=True)
        return Response(serializer.data)


class getAllAPI(APIView):
    permission_classes = ()

    def get(self, request):
        sales = Clients.objects.all().order_by('name')
        serializer = ClientsSerializer(sales, many=True)
        return Response(serializer.data)


class deleteAPI(APIView):
    permission_classes = ()

    def get(self, request, id):
        sale = Clients.objects.get(id=id)
        serializer = ClientsSerializer(sale)
        sale.delete()
        return Response(serializer.data)
