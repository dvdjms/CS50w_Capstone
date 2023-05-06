
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
import datetime


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def checkUsername(self, request):
        username = request.data.get(request.formData.username)
        print('username', username)
        return


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


class HomeView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        content = {'message': 'JWT Authenticated!'}
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
    # OpenWeather Api for todays weather, weather details, timezone
    response1 = requests.get('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=03f368dbb853b09836b1ab06b911628b')
    openWeather = response1.json()

    # Norway Met Api for 10 day forecast and weather symbol codes
    headers = {
        'User-Agent': 'https://github.com/dvdjms/CS50w_Capstone'
    }
    response2 = requests.get('https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=' + latitude + '&lon=' + longitude, headers=headers)
    weather2 = response2.json()
    timeseries = weather2['properties'].get('timeseries', [])

    # Iterate timeseries and obtain the first 24 hours from the Norway api request
    twentyfour_hour_data = []
    temp = {}
    for i in range(24):
        data = timeseries[i].get('data')
        time = timeseries[i].get('time')
        temp = {'time': time}
        twentyfour_hour_data.append(data)
        data.update(temp)

    # Iterate timeseries 10 days (...obtaining times 00:00, 06:00, 12:00, 18:00) 
    ten_day_data = []
    temp_ = {}
    for i in range(len(timeseries) - 1):
        data = timeseries[i].get('data')
        time = timeseries[i].get('time')
        getDate = datetime.datetime.strptime(time, '%Y-%m-%dT%H:%M:%SZ')
        if getDate.hour % 6 == 0:
            temp_ = {'time': time}
            ten_day_data.append(data)
            data.update(temp_)

    # Extract the two digit day from time, and group based on the day
    grouped_10_day_data = []
    for i in range(len(ten_day_data)):
        item = ten_day_data[i]
        x = slice(8,10)
        two_digit_day = int(item['time'][x])
        grouped_10_day_data.append({two_digit_day: item})
 
    # Iterate over grouped_10_day_data and group by dictionary keys
    grouped_data = {}
    for item in grouped_10_day_data:
        for key, value in item.items():
            if key not in  grouped_data:
                grouped_data[key] = []
            grouped_data[key].append(value)
    
    # Rename group key with list position for iteration purposes in frontend
    grouped_data = {index: value for index, value in enumerate(grouped_data.values())}
    ten_Day_Data_Grouped = list(grouped_data.values())

    return JsonResponse({
        'oneDay': {'twentyfourData' : twentyfour_hour_data},
        'tenDay': {'tenDayData': ten_Day_Data_Grouped},
        'openWeather': {'openWeather' : openWeather}
    })



# To delete outstanding / blacklisted tokens created during development

# from datetime import datetime
# from rest_framework_simplejwt.token_blacklist.models import \
# OutstandingToken, BlacklistedToken

# BlacklistedToken.objects.filter(token__expires_at__lt=datetime.now()).delete()
# OutstandingToken.objects.filter(expires_at__lt=datetime.now()).delete()
