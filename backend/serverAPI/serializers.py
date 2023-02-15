from .models import PointOfInterest
from rest_framework import serializers


class POISerializer(serializers.ModelSerializer):
    class Meta:
        model = PointOfInterest
        fields = ('code', 'category', 'title', "longitude", "latitude", "time", "way_len")
