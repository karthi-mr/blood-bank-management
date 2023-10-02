from rest_framework.filters import BaseFilterBackend

from .models import BloodRequest


class SortBloodRequestHistoryFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        new_query = None

        sort_order = request.query_params.get('ordering')

        if sort_order is None:
            return queryset

        # patient name
        if 'patient_name' in sort_order:
            if '-' in sort_order:
                new_query = BloodRequest.objects. \
                    order_by('-patient_name')
            else:
                new_query = BloodRequest.objects. \
                    order_by('patient_name')
            # print(f"New Query : {new_query}")
            return new_query

        # patient age
        if 'patient_age' in sort_order:
            if '-' in sort_order:
                new_query = BloodRequest.objects.order_by('-patient_age')
            else:
                new_query = BloodRequest.objects.order_by('patient_age')
            # print(f"New Query : {new_query}")
            return new_query

        # unit
        if 'unit' in sort_order:
            if '-' in sort_order:
                new_query = BloodRequest.objects.order_by('-unit')
            else:
                new_query = BloodRequest.objects.order_by('unit')
            # print(f"New Query : {new_query}")
            return new_query

        # added
        if 'added' in sort_order:
            if '-' in sort_order:
                new_query = BloodRequest.objects.order_by('-added')
            else:
                new_query = BloodRequest.objects.order_by('added')
            # print(f"New Query : {new_query}")
            return new_query

        # blood group
        if 'blood_group' in sort_order:
            if '-' in sort_order:
                new_query = BloodRequest.objects. \
                    order_by('-blood_group__blood_group')
            else:
                new_query = BloodRequest.objects. \
                    order_by('blood_group__blood_group')
            # print(f"New Query : {new_query}")
            return new_query
