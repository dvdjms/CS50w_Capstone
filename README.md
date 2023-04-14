# CS50w Capstone

# My Project title:



A full-stack website that allows users to register, login, and explore...



## Contents 

* [Ideas](#idea)
* [Showcase](#showcase)
* [Technologies](#technologies)
* [Brief](#brief)
* [Challenges](#challenges)
* [Running Capstone demonstration](#running-capstone-demonstration)


<br>

## Idea


<br>



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


## Brief

?



<br>

## Challenges

Here are some of the things we've found challenging:

* Connecting React frontend and django backend
* Authentication and Authorization
* ?
* ?


<br>




## Authentication and Authorization
<p>I decided early on that I wanted to explore authentication and authorization without borrowing from a previous pset, and I also wanted to explore django's rest framework. Django's built-in User model and UserSerializer was implemented which helped avoid a custom model, mainly because I didn't need more then the default settings. I used JWT for the tokens and refresh tokens. All API requests went via the rest framework. This whole process was difficult to implement but was a great learning curve.</p>



<br>

## Running Capstone demonstration

Run Locally

Clone the project and go to the project directory:

Install React and dependencies in the client folder:

```
cd client
```
```
npm install
```
```
npm styled-components
```
Prepare the client build folder: 
```
npm run build
```
...and to run the client side:
```
npm start
```
<br>
Install Django and dependencies in the server folder:

```
cd server
```

```
pip3 install django djangorestframework djangorestframework-jwt
```

Seed the database.:

```
python3 manage.py makemigrations
```
```
python manage.py migrate
```

Run django (leave running in a terminal window). Within the server folder:

```
python3 manage.py runserver
```

Run React development environment (leave running in a terminal window). Within client folder:

```
npm start
```

The application is running on port 3000 so visit http://localhost:3000/ to try out!





