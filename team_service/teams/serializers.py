from rest_framework import serializers
from .models import Team, TeamMember

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'org_id']
        read_only_fields = ['id', 'org_id']

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'team', 'user_id', 'role', 'status', 'invited_by']
        read_only_fields = ['id', 'status', 'invited_by']

class TeamWithMembersSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    description = serializers.CharField(required=False, allow_blank=True)
    members = serializers.ListField(
        child=serializers.UUIDField(),
        required=False
    )

    def validate_members(self, value):
        if len(value) != len(set(value)):
            raise serializers.ValidationError("Duplicate user IDs in members list")
        return value
    
    class Meta:
        model = Team
        fields = ['name', 'description', 'members']

class AddTeamMembersSerializer(serializers.ModelSerializer):
    members = serializers.ListField(
        child = serializers.UUIDField(),
        allow_empty = False
    )