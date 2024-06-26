from typing import Any

from rest_framework.permissions import BasePermission


class PatientPermission(BasePermission):

    def has_permission(self, request, view) -> Any:
        if not request.user.is_authenticated and view.action != 'create':
            return False
        if view.action in ('list', 'destroy') and request.user.user_type != 1:
            return False
        return True

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.user.user_type == 1


class TotalPatientPermission(BasePermission): 

    def has_permission(self, request, view) -> Any:
        if not request.user.is_authenticated:
            return False
        if request.user.user_type != 1:
            return False
        return True
