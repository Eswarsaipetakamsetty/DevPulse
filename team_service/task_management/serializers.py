from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class meta:
        model = Task
        fields = "__all__"