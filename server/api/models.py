from django.db import models


class Person(models.Model):
    name = models.CharField(max_length=32, default="")
    email = models.CharField(max_length=32, default="")
    

