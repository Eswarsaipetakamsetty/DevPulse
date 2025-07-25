from django.urls import path
from .views import (
    CreateTeamView, 
    MyInvitationsView, 
    AcceptInvitationView, 
    AddMembersView
    )

urlpatterns = [
    path("create/", CreateTeamView.as_view(), name="create-team"),
    path("invitations/", MyInvitationsView.as_view(), name="pending-invitations"),
    path("accept/<uuid:team_id>/", AcceptInvitationView.as_view(), name="accept-invitation"),
    path("add/<uuid:team_id>/", AddMembersView.as_view(), name="add-members"),
]
