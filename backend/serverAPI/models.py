from django.db import models

class PointOfInterest(models.Model):
    code = models.IntegerField()
    category = models.CharField(max_length=150)
    title = models.CharField(max_length=300)
    longitude = models.FloatField()
    latitude = models.FloatField()

    def __str__(self):
        return f'<{self.code} | {self.title} | {self.longitude} | {self.latitude}>'

class User(models.Model):
    user_code = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.user_code}'

class TravelRoute(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    way = models.ManyToManyField(PointOfInterest, blank=True)
    time = models.IntegerField(blank=True, null=True)
    way_len = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f'<User : {self.user} | way : >'
