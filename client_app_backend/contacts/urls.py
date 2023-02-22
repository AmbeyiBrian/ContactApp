from django.urls import path
from contacts import views

urlpatterns = [
        path('postAPI/', views.postAPI.as_view(), name='postAPI'),
        path('getAPI/<int:id>', views.getAPI.as_view(), name='getAPI'),
        path('getAllAPI/', views.getAllAPI.as_view(), name='getAllAPI'),
        path('deleteAPI/<int:id>', views.deleteAPI.as_view(), name='deleteAPI'),

        path('getContactClientLinkAllAPI/', views.getContactClientLinkAllAPI.as_view(), name='getContactClientLinkAllAPI'),
        path('postContactClientLinkAPI/', views.postContactClientLinkAPI.as_view(), name='postContactClientLinkAPI'),
        path('deleteContactClientLinkAPI/<int:id>', views.deleteContactClientLinkAPI.as_view(), name='deleteContactClientLinkAPI'),
    ]