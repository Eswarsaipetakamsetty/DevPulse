from django.db import models
import uuid

class Team(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    org_id = models.UUIDField()
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

class TeamMember(models.Model):
    ROLE_CHOICES = [
        ('Manager', 'manager'),
        ('Employee', 'employee')
    ]
    STATUS_CHOICES = [
        ('Pending', 'pending'),
        ('Accepted', 'accepted')
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    team = models.ForeignKey(Team, related_name='members', on_delete=models.CASCADE)
    user_id = models.IntegerField(null=False)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='employee')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')
    invited_by = models.IntegerField(null=False)
