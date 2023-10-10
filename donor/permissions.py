from rest_framework.permissions import BasePermission


class DonorPermission(BasePermission):

    def has_permission(self, request, view):
        if not request.user.is_authenticated and view.action != 'create':
            return False
        if view.action in ('list', 'destroy') and request.user.user_type != 1:
            return False
        return True

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.user.user_type == 1


class TotalDonorPermission(BasePermission):

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if request.user.user_type != 1:
            return False
        return True
