from rest_framework.filters import BaseFilterBackend

from .models import Donor, BloodDonate


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
            # print(f"New Query : {new_query}")
            return new_query

        # username
        if 'username' in sort_order:
            if '-' in sort_order:
                new_query = Donor.objects.order_by('-user__username')
            else:
                new_query = Donor.objects.order_by('user__username')
            # print(f"New Query : {new_query}")
            return new_query

        # mobile
        # if 'mobile' in sort_order:
        #     if '-' in sort_order:
        #         new_query = Donor.objects.order_by('-user__mobile')
        #     else:
        #         new_query = Donor.objects.order_by('user__mobile')
        #     # print(f"New Query : {new_query}")
        #     return new_query

        # last login
        if 'last_login' in sort_order:
            if '-' in sort_order:
                new_query = Donor.objects.order_by('-user__last_login')
            else:
                new_query = Donor.objects.order_by('user__last_login')
            # print(f"New Query : {new_query}")
            return new_query

        # blood group
        if 'blood_group' in sort_order:
            if '-' in sort_order:
                new_query = Donor.objects. \
                    order_by('-blood_group__blood_group')
            else:
                new_query = Donor.objects. \
                    order_by('blood_group__blood_group')
            # print(f"New Query : {new_query}")
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
            # print(f"New Query : {new_query}")
            return new_query

        # age
        if 'age' in sort_order:
            if '-' in sort_order:
                new_query = BloodDonate.objects.order_by('-age')
            else:
                new_query = BloodDonate.objects.order_by('age')
            # print(f"New Query : {new_query}")
            return new_query

        # added
        if 'added' in sort_order:
            if '-' in sort_order:
                new_query = BloodDonate.objects.order_by('-added')
            else:
                new_query = BloodDonate.objects.order_by('added')
            # print(f"New Query : {new_query}")
            return new_query

        # blood group
        if 'blood_group' in sort_order:
            if '-' in sort_order:
                new_query = BloodDonate.objects. \
                    order_by('-blood_group__blood_group')
            else:
                new_query = BloodDonate.objects. \
                    order_by('blood_group__blood_group')
            # print(f"New Query : {new_query}")
            return new_query
