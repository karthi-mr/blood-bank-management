from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework import status

class CustomPagination(LimitOffsetPagination):
    offset = 0
    default_limit = 24
    
    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'total': self.count,
            'count': len(data),
            'results': data
        }, status=status.HTTP_200_OK)