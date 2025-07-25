from django.db import models
from uuid import uuid4

class Task(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'pending'),
        ('In_Progress', 'in_progress'),
        ('Completed', 'completed')
    ]

    id = models.UUIDField(primary_key=True ,default=uuid4())
    title = models.CharField(max_length=255)
    description = models.TextField()
    deadline = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    assigned_to = models.IntegerField()  #user_id from auth_service
    assigned_by = models.IntegerField()  #manager user_id

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
