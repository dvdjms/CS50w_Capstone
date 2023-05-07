# CS50w Capstone

## **WeatherWise**

<br>
A full-stack application that allows a user to register, login, and view the weather forecast of 45,000 cities worldwide. A user can search for a city; a user can view today's forecast; a user can view 24 hour forecast; a user can view 10 day forecast; a user can add and remove cities to a user dashboard; a user can search Wikipedia for a city summary.

<br>

## Contents 

* [Distinctiveness and Complexity](#distinctiveness-and-complexity)
* [Technologies](#technologies)
* [Files and Directories](#files-and-directories)
* [Running Capstone demonstration](#running-capstone-demonstration)


<br>

## Distinctiveness and Complexity
This project was approached with three main aims: practise APIs, implement Django Rest Framework, and explore Authorisation and Authentication without borrowing from previous psets. These ideas alone pave the way for a distinct and complex project.

While exploring the world of 'free' APIs it was felt weather was a good topic for this project. Although a generic topic it's relevant, accessible, and can be approached in many different ways. Weather provides data for time and timezones, multiple units of measurement, hourly forecasts, daily forecasts, weather symbol codes, and more... enabling an exploration of many coding possibilities.

Realising the limitations of some free APIs, it become apparent that a single API may not provide required data, thus combining sources was the obvious next step. This project includes:

OpenWeather API          https://openweathermap.org/api
<br>
Norway MET Weather API   https://api.met.no/
<br>
Wikipedia API            https://en.wikipedia.org/w/api.php


OpenWeather is popular and great for providing some data, but combining it with Norway's Met API showcases a more complex approach. In addition, Wikipedia's API provides a brief summary of locations searched which adds a little more user interaction.

Django Rest Framework provided a huge learning curve, which along with JWT Authorisation and Authentication, seemed a little unneessary to begin with. But committed to implementing them, and to maintain distinctiveness and complexity, the idea of a user adding and deleting locations to a dashboard seemed a reasable enough reason. Implementation was difficult to say the least with access tokens and refresh tokens and difficult to understand documentation... but a huge learning curve.
<br><br>
Database includes:

1. User Model - implemented with authorisation and authentication
2. City Model - downloaded from simplemaps.com via Norway Met API, providing 45,000 cities with data including latittude and longitude which was vital for this project. Data was cleansed and pushed onto the database using sqlite3 command line shell. http://simplemaps.com/data/world-cities. 
3. Favourites Model - a simple Model with users and city data that is added and removed on user request.
<br><br>

#### Client side:

I had used React on some recent projects (with Express) and felt comfortable enough to attempt a Django and React project. React was introduced in the User Interfaces lecture but implementing a full Create React App was not, nor has it been used in previous psets. Connecting the server side and client side took several attempts and lots of research which demonstrated its complexity, for me at least - folder and file architecture, routing, etc. Not an easy set up but once connected I was all set.
<br><br>

#### Additional:

This project is distinct because it explores libraries and technologies not used in the lectures or previous psets. 

Styled-components has not been mentioned or used in any lecture or previous pset. It has however, been used extensively throughout this project.

The complexity of date and time is showcased in this project. I am proud of the results though I'm pretty sure I can develop the implementation with more experience.

Combining APIs in a single project has not been done previously. Fetching and outputting data from multiple sources based on city selected by the user is complex enough to satisfy project criteria. Combining, grouping, and packaging data, for frontend render was no easy task.

User selects a city -> fetch request with city latitude and longitude sent to backend -> API request to OpenWeather and API request to Norway Met to fetch weather data -> data grouped by date and packaged for frontend -> data sent to frontend -> data manipulated further, including time and timezone -> data output to user.

This app is fully mobile responsive and I'm rather proud of the grid system I've used as the screen changes in size.

<br>

## Technologies

These are the main technologies used in the project.

* Python
* Django
* Django REST Framework
* React
* HTML
* JavaScript
* Styled-Components
* Sqlite3

<br>

## Files and Directories
(files added or important)
- __client__
    - __public__
       - __weathericons__ - Downloaded from Norway Met API. Includes all weather icons in svg.
    - __src__
       - __components__ (children)
            - __DailyWeather.jsx__ - The most complex component with not so DRY code. Contains functions to summerize data for rendering, and converting timezones. Handles 10 day forecast via onclick function. Data from parent via props.
            - __helpers.js__ - Contains time convertion functions and favourite weather fetch request to compartmentalise the handleFavourites function in Home.jsx.
            - __HourlyWeather.jsx__ - Renders hourly forecast via map function from props.
            - __MyLocations.jsx__ - Renders favourites/myLocations via map function from props.
            - __NavBarjsx__ - Renders navigation header and contains isAuthorised function in useEffect to render login or logout buttons.
            - __Search.jsx__ - Renders city names via map function from props.
            - __TodayWeather.jsx__ - Renders today's weather and includes an onclick function to get details. Data via props.
            - __Weather.jsx__ - A component of Home.jsx and container for TodayWeather.jsx, HourlyWeather.jsx, and DailyWeather.jsx. Data from props. Contains function to add or remove favourites from dashboard
            - __Wiki.jsx__ - Contains fetch request to render summary of user input from Wikipedia. Should have been automated with city search but it couldn't handle duplicated city names with the limited information in my data.
       - __containers__ (parents)
            - __Home.jsx__ - Parent container for Navbar.jsx, MyLocations.jsx, Search.jsx, Weather.jsx, and Wiki.jsx. Handles cities API fetch, weather API fetch, and favourites API fetch. Data then passed down to children via props.
            - __Login.jsx__ - Contains login form and handles fetch request on submit.
            - __Logout.jsx__ - Contains function to clear tokens from local storage and send taken to backend via fetch request.
            - __Register.jsx__ - Contains registration form and handles fetch request on submit.
       - App.js - Contains authorisation and authentication function, and all app Routes. 
- __server__
    - __api__
      - __admin.py__ - Classes to provide titles to tables in Django admin.
      - __apps.py__ - Class for app created automatically.
      - __models.py__ - Class models for City and Favourites
      - __serializers.py__ - City serializer, Favourites serializer, and User serialiser with create method to save new user to database.
      - __tests.py__ - Sorry!
      - __urls.py__ - For Django Rest Framework and calling functions in views.py
      - __views.py__ - Contains classes for CreateUserView; CitySearchView with get city method, which returns top 17 cities; CityFavouritesView with get_city method; FavouritesView, with add and remove methods; HomeView; and LogoutView. Also contains function to fetch Wikipedia data and fetch Weather data.
    - __core__
      - __views.py__ - Used to render index.html only
    - __server__
      - __README.md__ - That's me!
<br><br>

## Running Capstone demonstration

*Clone the project and go to the project directory.*

Install React and dependencies in the client folder:

```
cd client
```
```
npm install
```
```
npm install react-router-dom
```
```
npm styled-components
```
Prepare the client build folder: 

```
npm run build
```
Run React development environment within client folder (leave running in terminal window):

```
npm start
``` 
<br>

Install Django and dependencies in the server folder.
Open a second terminal window.

```
cd server
```

```
python3 -m pip install djangorestframework

python3 -m pip install djangorestframework-simplejwt

python3 -m pip install django-cors-headers

python3 -m pip install requests
```

Seed the database.:

```
python3 manage.py makemigrations
```
```
python manage.py migrate
```

Run Django within the server folder (leave running in terminal window).

```
python3 manage.py runserver
```


The application is running on port 3000 so visit http://localhost:3000/ to try out!
