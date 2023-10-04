from rest_framework.filters import BaseFilterBackend

from .models import BloodDonate, Donor


class SortFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        new_query = None

        sort_order = request.query_params.get('ordering')

        if sort_order is None:
            return queryset

        # email
        if 'email' in sort_order:
            if '-' in sort_order:
                new_query = Donor.objects.order_by('-user__email')
            else:
                new_query = Donor.objects.order_by('user__email')
            return new_query

        # username
        if 'username' in sort_order:
            if '-' in sort_order:
                new_query = Donor.objects.order_by('-user__username')
            else:
                new_query = Donor.objects.order_by('user__username')
            return new_query

        # last login
        if 'last_login' in sort_order:
            if '-' in sort_order:
                new_query = Donor.objects.order_by('-user__last_login')
            else:
                new_query = Donor.objects.order_by('user__last_login')
            return new_query

        # blood group
        if 'blood_group' in sort_order:
            if '-' in sort_order:
                new_query = Donor.objects. \
                    order_by('-blood_group__blood_group')
            else:
                new_query = Donor.objects. \
                    order_by('blood_group__blood_group')
            return new_query


class SortBloodDonateHistoryFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        new_query = None

        sort_order = request.query_params.get('ordering')

        if sort_order is None:
            return queryset

        # donor
        if 'donor' in sort_order:
            if '-' in sort_order:
                new_query = BloodDonate.objects. \
                    order_by('-donor__user__username')
            else:
                new_query = BloodDonate.objects. \
                    order_by('donor__user__username')
            return new_query

        # age
        if 'age' in sort_order:
            if '-' in sort_order:
                new_query = BloodDonate.objects.order_by('-age')
            else:
                new_query = BloodDonate.objects.order_by('age')
            return new_query

        # added
        if 'added' in sort_order:
            if '-' in sort_order:
                new_query = BloodDonate.objects.order_by('-added')
            else:
                new_query = BloodDonate.objects.order_by('added')
            return new_query

        # blood group
        if 'blood_group' in sort_order:
            if '-' in sort_order:
                new_query = BloodDonate.objects. \
                    order_by('-blood_group__blood_group')
            else:
                new_query = BloodDonate.objects. \
                    order_by('blood_group__blood_group')
            return new_query


class DonorSearchFilter(BaseFilterBackend):

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


class BloodDonateSearchFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):

        new_query = queryset

        donorFilter = request.query_params.get('donor')
        diseaseFilter = request.query_params.get('disease')
        ageFilter = request.query_params.get('age')
        unitFilter = request.query_params.get('unit')
        bloodGroupFilter = request.query_params.get('blood_group')

        if donorFilter:
            new_query = new_query.filter(
                donor__user__username__icontains=donorFilter)
        if ageFilter:
            new_query = new_query.filter(age__icontains=ageFilter)
        if diseaseFilter:
            new_query = new_query.filter(disease__icontains=diseaseFilter)
        if unitFilter:
            new_query = new_query.filter(unit__icontains=unitFilter)
        if bloodGroupFilter:
            if '-' not in bloodGroupFilter:
                bloodGroupFilter = bloodGroupFilter.strip() + '+'
            new_query = new_query.filter(
                blood_group__blood_group__iexact=bloodGroupFilter)

        return new_query
