# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

from rest_framework import generics
from .serializers import PersonSerializer, UserSerializer
from .models import Person
from django.contrib.auth.models import User


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()



# # Create your views here.
# class PersonView(generics.CreateAPIView):
class PersonView(generics.ListAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class HomeView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
        return Response(content)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

# class RegisterView(APIView):
#     def post(self, request):
#         content = {'message': 'Registered!'}
#         return Response(content)








# from datetime import datetime
# from rest_framework_simplejwt.token_blacklist.models import \
# OutstandingToken, BlacklistedToken

# BlacklistedToken.objects.filter(token__expires_at__lt=datetime.now()).delete()
# OutstandingToken.objects.filter(expires_at__lt=datetime.now()).delete()