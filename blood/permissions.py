from rest_framework.permissions import SAFE_METHODS, BasePermission


class BloodGroupPermission(BasePermission):

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        if not request.user.is_authenticated:
            return False
        if request.user.user_type != 1:
            return False
        return True


class StockPermission(BasePermission):

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if request.user.user_type != 1:
            return False
        return True


class UpdateStockPermission(BasePermission):

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if request.user.user_type != 1:
            return False
        return True


class BloodRequestPermission(BasePermission):

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return True


class BloodRequestUpdatePermission(BasePermission):

    def has_permission(self, request, view):
        if request.user.user_type == 1:
            return True
        return False
