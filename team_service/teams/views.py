from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Team, TeamMember
from .serializers import (
    TeamSerializer, 
    TeamMemberSerializer, 
    TeamWithMembersSerializer, 
    AddTeamMembersSerializer
    )
from utils import get_user_and_org
from django.shortcuts import get_object_or_404
from django.db import transaction



class CreateTeamView(APIView):
    def post(self, request):
        user_id, org_id = get_user_and_org(request)

        if not user_id:
            return Response({
                "detail" : "Invalid token"
            }, status=401)
        
        serializer = TeamWithMembersSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        
        data = serializer.validated_data
        invited_users = data.get("members", [])
        try:
            with transaction.atomic():
                team = Team.objects.create(
                    name=data["name"], 
                    description=data.get("description", ""), 
                    org_id=org_id
                )

                TeamMember.objects.create(
                    team=team,
                    user_id=user_id,
                    role='manager',
                    status='accepted',
                    invited_by=user_id
                )

                filtered_user_ids = [uid for uid in invited_users if uid != user_id]
                existing_members = TeamMember.objects.filter(
                    team=team,
                    user_id__in = filtered_user_ids
                ).values_list("user_id", flat=True)

                for u_id in filtered_user_ids:
                    if u_id in existing_members:
                        continue
                    TeamMember.objects.create(
                        team=team,
                        user_id=u_id,
                        role="employee",
                        status="pending",
                        invited_by=user_id
                    )
            return Response({
                "message": "Team created",
                "team": TeamSerializer(team).data,
                }, status=201)
        except Exception as e:
            return Response({
                "detail": str(e)
            }, status=500)

class AddMembersView(APIView):
    def put(self, request, team_id):
        user_id, org_id = get_user_and_org(request)
        serializer = AddTeamMembersSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        new_member_ids = serializer.validated_data["members"]

        try:
            team = Team.objects.get(id=team_id, org_id=org_id)
        except Team.DoesNotExist:
            return Response({
                "detail" : "Team not found"
            }, status=404)
        
        try:
            requester = TeamMember.objects.get(team=team, user_id=user_id)
            if requester.role != 'manager':
                return Response({
                    "detail": "Only managers can add members"
                }, status=403)
        except TeamMember.DoesNotExist:
            return Response({
                "detail": "You are not a member of the team"
            }, status=403)
        
        added = []
        skipped = []

        with transaction.atomic():
            for mem_id in new_member_ids:
                if TeamMember.objects.filter(team=team, user_id=mem_id).exists():
                    skipped.append(mem_id)
                    continue
                TeamMember.objects.create(
                    team = team,
                    user_id = mem_id,
                    role = "employee",
                    status = "pending",
                    invited_by = user_id
                )

                added.append(mem_id)
        
        return Response({
            "message": "Members processed",
            "added" : added,
            "skipped" : skipped
        }, status=201)

class MyInvitationsView(APIView):
    def get(self, request):
        user_id, _ = get_user_and_org(request)
        invites = Team.objects.filter(user_id=user_id, status='pending')
        serializer = TeamMemberSerializer(invites, many=True)
        return Response(serializer.data, status=200)

class AcceptInvitationView(APIView):
    def post(self, request, team_id):
        user_id, _ = get_user_and_org(request)
        try:
            member = TeamMember.objects.get(user_id=user_id, team_id=team_id)
            if member.status == 'accepted':
                return Response({
                    "detail" : "Already Accepted"
                }, status=400)
            member.status = 'accepted'
            member.save()
            return Response(TeamMemberSerializer(member).data, status=200)
        except TeamMember.DoesNotExist:
            return Response({
                "detail": "Invitation not found"
            }, status=404)

