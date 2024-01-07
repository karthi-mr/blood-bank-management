from rest_framework.permissions import BasePermission


class AdminPermission(BasePermission):

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if view.action in ('list', 'destroy', 'create') and \
                request.user.username != "admin":
            return False
        return True

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.user.username == "admin"
