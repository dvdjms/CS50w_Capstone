from rest_framework import serializers
from django.contrib.auth.models import User
from .models import City, Favourite

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('id', 'city', 'city_ascii', 'lat', 'lng', 'country', 'iso2', 'iso3', 'admin_name', 'population', 'cityid')


class FavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = ['id', 'username', 'city_ascii', 'lat', 'lng', 'timezone', 'cityid']


class UserSerializer(serializers.ModelSerializer):

    # def validate_username(self, value):
    #     ModelClass = self.Meta.model
    #     if User.objects.filter(username=value).exists():
    #         print('already exists')
    #         raise serializers.ValidationError('already exists')
    #     print('continue')
    #     return value

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
