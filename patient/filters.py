from rest_framework.filters import BaseFilterBackend

from .models import Patient


class SortFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        new_query = queryset

        sort_order = request.query_params.get('ordering')

        if sort_order is None:
            return queryset

        # email
        if 'email' in sort_order:
            if '-' in sort_order:
                new_query = new_query.order_by('-user__email')
            else:
                new_query = new_query.order_by('user__email')
            return new_query

        # username
        if 'username' in sort_order:
            if '-' in sort_order:
                new_query = new_query.order_by('-user__username')
            else:
                new_query = new_query.order_by('user__username')
            return new_query

        # last login
        if 'last_login' in sort_order:
            if '-' in sort_order:
                new_query = new_query.order_by('-user__last_login')
            else:
                new_query = new_query.order_by('user__last_login')
            return new_query

        # blood group
        if 'blood_group' in sort_order:
            if '-' in sort_order:
                new_query = new_query.order_by('-blood_group__blood_group')
            else:
                new_query = new_query.order_by('blood_group__blood_group')
            return new_query


class PatientSearchFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):

        new_query = queryset

        usernameFilter = request.query_params.get('username')
        emailFilter = request.query_params.get('email')
        mobileFilter = request.query_params.get('mobile')
        bloodGroupFilter = request.query_params.get('blood_group')

        if usernameFilter:
            new_query = new_query.filter(
                user__username__icontains=usernameFilter)
        if emailFilter:
            new_query = new_query.filter(user__email__icontains=emailFilter)
        if mobileFilter:
            new_query = new_query.filter(user__mobile__icontains=mobileFilter)
        if bloodGroupFilter:
            if '-' not in bloodGroupFilter:
                bloodGroupFilter = bloodGroupFilter.strip() + '+'
            new_query = new_query.filter(
                blood_group__blood_group__iexact=bloodGroupFilter)

        return new_query
