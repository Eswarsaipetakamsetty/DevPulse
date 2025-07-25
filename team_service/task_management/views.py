from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from utils import get_user_and_org

from .models import Task
from .serializers import TaskSerializer

class CreateTaskView(APIView):
    def post(self, request):
        user_id, _ = get_user_and_org(request)
        if not user_id:
            return Response({
                "detail": "Invalid token"
            }, status=400)
        data = request.data.copy()
        data["assigned_by"] = user_id
        serializer = TaskSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        serializer.save()
        return Response(serializer.data, status=201)

class TaskListView(APIView):
    def get(self, request):
        user_id, _ = get_user_and_org(request)
        if not user_id:
            return Response({
                "detail": "Invalid token"
            }, status=400)
        tasks = Task.objects.filter(assigned_to=user_id)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=200)
