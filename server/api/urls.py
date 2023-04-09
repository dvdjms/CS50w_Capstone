from django.urls import path
# from .views import PersonView
from . import views


urlpatterns = [
    path('api', views.PersonView.as_view()),
    path('home/', views.HomeView.as_view(), name ='home'),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
    # path('register/', views.RegisterView.as_view(), name ='register'),
    path('api/users/', views.CreateUserView.as_view(), name='create_user'),
    path('wiki', views.wikipedia, name="wiki"), 
    path('weather', views.openWeather, name="weather"), 
]



