from django.contrib import admin

# Register your models here.
from .models import Person

# class UserAdmin(admin.ModelAdmin):
#     list_display = ('username', 'email')

class PersonAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email')


# class UserAdmin(admin.ModelAdmin):
#     list_display = ('id', 'username', 'first_name', 'last_name', 'email', 'password')



# admin.site.register(User, UserAdmin)
admin.site.register(Person, PersonAdmin)