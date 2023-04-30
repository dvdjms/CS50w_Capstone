from django.urls import path
# from .views import PersonView
from . import views


urlpatterns = [
    # path('api', views.CityView.as_view()),
    path('home/', views.HomeView.as_view(), name='home'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    
    path('api/cities/<int:cityid>', views.CityFavouritesView.as_view(), name='city'),
    path('api/cities/<str:city_ascii>', views.CitySearchView.as_view(), name='city1'),
    path('api/cities/', views.CitySearchView.as_view(), name='cities'),
    path('api/favourites/', views.FavouriteView.as_view(), name='favourite'),
    path('api/users/', views.CreateUserView.as_view(), name='create_user'),
    path('wiki', views.wikipedia, name='wiki'), 
    path('weather', views.Weather, name='weather'), 
]



