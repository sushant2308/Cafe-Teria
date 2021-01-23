from rest_framework import generics, authentication, permissions, serializers,status
from rest_framework import response
from rest_framework.authtoken.views import ObtainAuthToken
from django.shortcuts import redirect, render,get_object_or_404
from rest_framework.settings import api_settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer, AuthTokenSerializer,FoodSerializer,OrderSerializer
from .models import Food,Order



class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer


class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve and return authentication user"""
        return self.request.user

"""for getting food item list"""
@api_view(['GET', ])
def Food_list(request):
    product=Food.objects.all()
    serializer=FoodSerializer(product,many=True)

    return Response(serializer.data)

"""for Adding food item """
@api_view(['POST', ])
def Add_food(request):
    serializer=FoodSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)

    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
"""for order list"""
@api_view(['GET', ])
def Order_list(request):
    order=Order.objects.all()
    serializer=OrderSerializer(order,many=True)

    return Response(serializer.data)
"""Creating Order"""
@api_view(['GET',],)
def Purchase(request,slug):
    food=get_object_or_404(Food,id=slug)
    user=request.user
    order=Order(Buyer=user , food_item=food)
    order.save()
    return Response(status=status.HTTP_201_CREATED)