from django.contrib import admin

# Register your models here.
from .models import City


class CityAdmin(admin.ModelAdmin):
    list_display = ('city_ascii', 'lat', 'lng', 'country', 'admin_name', 'population')




# admin.site.register(User, UserAdmin)
admin.site.register(City, CityAdmin)