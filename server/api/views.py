
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework import generics
from .serializers import CitySerializer, UserSerializer, FavouriteSerializer
from .models import City, Favourite
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import requests


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


# Returns top 17 city objects based on user (search) input 
class CitySearchView(generics.ListAPIView):
    serializer_class = CitySerializer
    def get_queryset(self):
        searchField = self.kwargs.get("city_ascii", "")
        city_data = City.objects.filter(city_ascii__istartswith=searchField)
        return city_data[:17]
    
        
# Returns single city object based on favourites click
class CityFavouritesView(generics.ListAPIView):
    serializer_class = CitySerializer
    def get_queryset(self):
        cityID = self.kwargs.get("cityid", "")
        city_data = City.objects.filter(cityid__exact=cityID)
        return city_data


# Adds or deletes cities from Favourites
class FavouriteView(generics.ListAPIView, generics.DestroyAPIView, generics.CreateAPIView):
    serializer_class = FavouriteSerializer

    def get_queryset(self):
        favourites = Favourite.objects.filter(username=self.request.user)
        return favourites
    
    def post(self, request):
        user_name = self.request.user
        city_id = request.data.get('cityid')
        new_instance = {
            'username': user_name.username, 
            'city_ascii': request.data.get('city_ascii'),
            'lat': request.data.get('latitude'),
            'lng': request.data.get('longitude'),
            'timezone': request.data.get('timezone'),
            'cityid': city_id
            }
        try:
            favourite = Favourite.objects.get(cityid=city_id, username=user_name.username)
            favourite.delete()
            return Response({'message': 'City deleted successfully'})
        except Favourite.DoesNotExist:
            serializer = FavouriteSerializer(data=new_instance)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'City added successfully'})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# I don't think this is doing much... see app.js regarding token
class HomeView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        content = {'message': 'Welcome to the JWT Authentication page!'}
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
        

@csrf_exempt
def wikipedia(request):
    title = json.loads(request.body)
    response = requests.get('https://en.wikipedia.org/api/rest_v1/page/summary/' + title['search'])
    wikiSummary = response.json()
    if wikiSummary['title'] == 'Not found.':
        return JsonResponse({'summary': 'Search not listed'})
    return JsonResponse({
        'summary': wikiSummary['extract'],
        'image' : wikiSummary['thumbnail']['source']
    })


@csrf_exempt
def Weather(request):
    data = json.loads(request.body)
    latitude = str(data['latitude'])
    longitude = str(data['longitude'])
    # OpenWeather Api for todays weather
    response1 = requests.get('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=03f368dbb853b09836b1ab06b911628b')
    openWeather = response1.json()
    # Norway Met Api for future weather and weather symbols
    headers = {
        'User-Agent': 'https://github.com/dvdjms/CS50w_Capstone'
    }
    response2 = requests.get('https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=' + latitude + '&lon=' + longitude, headers=headers)
    weather2 = response2.json()
    timeseries = weather2['properties'].get('timeseries', [])

    twentyfour_hour_data = []
    temp = {}
    for i in range(24):
        data = timeseries[i].get('data')
        time = timeseries[i].get('time')
        temp = {'time': time}
        twentyfour_hour_data.append(data)
        data.update(temp)

    ten_day_data = []
    temp_ = {}
    for i in range(25, len(timeseries)):
        data = timeseries[i].get('data')
        time = timeseries[i].get('time')
        temp_ = {'time': time}
        ten_day_data.append(data)
        data.update(temp_)

    return JsonResponse({
        'oneDay': {'twentyfourData' : twentyfour_hour_data},
        'tenDay': {'tenDayData': ten_day_data},
        'openWeather': {'openWeather' : openWeather}
    })



# def Favourites():
    
#     body1 = {body: {'latitude': 55.55, 'longitude': 55.55}}

#     newdata = Weather(body1)
#     print(newdata)
#     return newdata


# Favourites()


# from datetime import datetime
# from rest_framework_simplejwt.token_blacklist.models import \
# OutstandingToken, BlacklistedToken

# BlacklistedToken.objects.filter(token__expires_at__lt=datetime.now()).delete()
# OutstandingToken.objects.filter(expires_at__lt=datetime.now()).delete()