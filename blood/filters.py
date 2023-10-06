from rest_framework.filters import BaseFilterBackend

from .models import BloodRequest


class SortBloodRequestHistoryFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        new_query = queryset

        sort_order = request.query_params.get('ordering')

        if sort_order is None:
            return queryset

        # patient name
        if 'patient_name' in sort_order:
            if '-' in sort_order:
                new_query = new_query.order_by('-patient_name')
            else:
                new_query = new_query.order_by('patient_name')
            return new_query

        # patient age
        if 'patient_age' in sort_order:
            if '-' in sort_order:
                new_query = new_query.order_by('-patient_age')
            else:
                new_query = new_query.order_by('patient_age')
            return new_query

        # unit
        if 'unit' in sort_order:
            if '-' in sort_order:
                new_query = new_query.order_by('-unit')
            else:
                new_query = new_query.order_by('unit')
            return new_query

        # added
        if 'added' in sort_order:
            if '-' in sort_order:
                new_query = new_query.order_by('-added')
            else:
                new_query = new_query.order_by('added')
            return new_query

        # blood group
        if 'blood_group' in sort_order:
            if '-' in sort_order:
                new_query = new_query.order_by('-blood_group__blood_group')
            else:
                new_query = new_query.order_by('blood_group__blood_group')
            return new_query


class BloodRequestSearchFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):

        new_query = queryset

        nameFilter = request.query_params.get('name')
        ageFilter = request.query_params.get('age')
        reasonFilter = request.query_params.get('reason')
        unitFilter = request.query_params.get('unit')
        bloodGroupFilter = request.query_params.get('blood_group')

        if nameFilter:
            new_query = new_query.filter(patient_name__icontains=nameFilter)
        if ageFilter:
            new_query = new_query.filter(patient_age__icontains=ageFilter)
        if reasonFilter:
            new_query = new_query.filter(reason__icontains=reasonFilter)
        if unitFilter:
            new_query = new_query.filter(unit__icontains=unitFilter)
        if bloodGroupFilter:
            if '-' not in bloodGroupFilter:
                bloodGroupFilter = bloodGroupFilter.strip() + '+'
            new_query = new_query.filter(
                blood_group__blood_group__iexact=bloodGroupFilter)

        return new_query
