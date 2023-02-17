from .models import *
from rest_framework import serializers


class POISerializer(serializers.ModelSerializer):
    class Meta:
        model = PointOfInterest
        fields = ('code', 'category', 'title', "longitude", "latitude")

class ReadyRotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadyRoutes
        fields = '__all__'