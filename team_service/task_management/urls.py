from django.urls import path
from .views import CreateTaskView, TaskListView

urlpatterns = [
    path("create/", CreateTaskView.as_view(), name='create-task'),
    path("my_tasks/", TaskListView.as_view(), name='my-tasks'),
]
