# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from datetime import datetime, timedelta


from rest_framework import generics
from .serializers import CitySerializer, UserSerializer
from .models import City
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import requests


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


# Create your views here.
class CityView(generics.ListAPIView):
    serializer_class = CitySerializer
    def get_queryset(self):
        searchField = self.kwargs.get("city_ascii", "")
        # print('search...', searchField)
        city_data = City.objects.filter(city_ascii__istartswith=searchField)
        return city_data[:17]


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
    headers = {
        'User-Agent': 'https://github.com/dvdjms/CS50w_Capstone'
    }
    data = json.loads(request.body)
    latitude = str(data['latitude'])
    longitude = str(data['longitude'])
    response = requests.get('https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=' + latitude + '&lon=' + longitude, headers=headers)
    weather = response.json()

    timeseries = weather['properties'].get('timeseries', [])
    
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

    # temperature = twentyfour_hour_data[0]['instant']['details']['air_temperature']
    # wind = twentyfour_hour_data[0]['instant']['details']['wind_speed']
    # pressure = twentyfour_hour_data[0]['instant']['details']['air_pressure_at_sea_level']
    # humidity = twentyfour_hour_data[0]['instant']['details']['relative_humidity']
    # symbol1 = twentyfour_hour_data[0]['next_1_hours']['summary']['symbol_code']
    # symbol2 = twentyfour_hour_data[0]['next_6_hours']['summary']['symbol_code']
    # symbol3 = twentyfour_hour_data[0]['next_12_hours']['summary']['symbol_code']
    # rain1 = twentyfour_hour_data[0]['next_1_hours']['details']['precipitation_amount']
    # rain2 = twentyfour_hour_data[0]['next_6_hours']['details']['precipitation_amount']
    # instantWeather = [temperature, wind, pressure, humidity, symbol1, symbol2, symbol3, rain1, rain2]

    return JsonResponse({
        'oneDay': {'twentyfourData' : twentyfour_hour_data},
        'tenDay': {'tenDayData': ten_day_data},
        # 'instantWeather': instantWeather
    })







# from datetime import datetime
# from rest_framework_simplejwt.token_blacklist.models import \
# OutstandingToken, BlacklistedToken

# BlacklistedToken.objects.filter(token__expires_at__lt=datetime.now()).delete()
# OutstandingToken.objects.filter(expires_at__lt=datetime.now()).delete()