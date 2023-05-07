from django.contrib import admin

# Register your models here.
from .models import City, Favourite


class CityAdmin(admin.ModelAdmin):
    list_display = ('city_ascii', 'lat', 'lng', 'country', 'admin_name', 'population')


class FavouriteAdmin(admin.ModelAdmin):
    list_display = ('username', 'city_ascii', 'timezone', 'cityid')


admin.site.register(City, CityAdmin)
admin.site.register(Favourite, FavouriteAdmin)
