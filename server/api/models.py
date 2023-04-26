from django.db import models



# source: https://simplemaps.com/data/world-cities 
class City(models.Model):
    city = models.CharField(max_length=32, blank=False)
    city_ascii = models.CharField(max_length=32, blank=False)
    lat = models.FloatField(blank=False)
    lng = models.FloatField(blank=False)
    country = models.CharField(max_length=32, blank=False)
    iso2 = models.CharField(max_length=32, blank=False)
    iso3 = models.CharField(max_length=32,blank=False)
    admin_name = models.CharField(max_length=32, blank=False)
    population = models.IntegerField(default=0, null=False)
    cityid = models.IntegerField(default=0, null=False)


class Favourite(models.Model):
    username = models.CharField(max_length=32, blank=False)
    city_ascii = models.CharField(max_length=32, blank=False)
    lat = models.FloatField(blank=False)
    lng = models.FloatField(blank=False)
    timezone = models.IntegerField(default=0, null=False)
    cityid = models.IntegerField(default=0, null=False)
