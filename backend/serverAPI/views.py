from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from serverAPI.models import User, TravelRoute, PointOfInterest
from rest_framework import generics
from .serializers import POISerializer
from .funcs import GenUniqueUserCode


class POIView(generics.ListAPIView):
    queryset = PointOfInterest.objects.all()
    serializer_class = POISerializer

class CreateUserAPI(APIView):
    def get(self, request):
        code = GenUniqueUserCode()
        User.objects.create(user_code=code)
        return Response({'user_code': code})

class HistoryView(APIView):
    def post(self, request):
        user_code = request.data['user_code']
        rouds = TravelRoute.objects.filter(user__user_code=user_code)
        answer = []
        for roud in rouds:
            answer.append(POISerializer(roud.way.all(), many=True).data)
        return Response({'post': answer})

class AddHistoryView(APIView):
    def post(self, request):
        user_code = request.data['user_code']
        trip = TravelRoute.objects.create(user=User.objects.get(user_code=user_code))
        for point in request.data['data']:
            p = POISerializer(data=point)
            trip.way.add(point['code'])
        trip.save()
        return Response({'ans' : 'good'})
