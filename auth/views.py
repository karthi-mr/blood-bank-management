from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from rest_framework import authentication, generics, permissions, status
from rest_framework.decorators import APIView, api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User
from .serializers import MyTokenObtainPairSerializer


class MyObtainTokenPairView(TokenObtainPairView):  # user login
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        if username == None:
            return Response({'error': "USER_NAME_NOT_PRESENT"}, status=status.HTTP_400_BAD_REQUEST)
        if password == None:
            return Response({'error': "PASSWORD_NOT_PRESENT"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(Q(username__iexact=username) | 
                                    Q(email__iexact=username) |
                                    Q(mobile__iexact=username))
        except ObjectDoesNotExist:
            return Response({'error': "USER_NOT_EXISTS"}, status=status.HTTP_403_FORBIDDEN)
        if not check_password(password=password, encoded=user.password):
            return Response({'error': "WRONG_PASSWORD"}, status=status.HTTP_403_FORBIDDEN)
        
        user_token = MyTokenObtainPairSerializer.get_token(user)
        update_last_login(None, user)
        response = {
            'access': str(user_token.access_token),
            'refresh': str(user_token)
        }
        return Response({'auth_token': response})


class ResetPasswordView(APIView):  # password reset
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.BasicAuthentication, JWTAuthentication]

    def post(self, request):
        user = request.user
        oldPassword = request.data.get('old_password')
        newPassword = request.data.get('new_password')
        newPassword1 = request.data.get('new_password1')

        if oldPassword == None:
            return Response({'error': "OLD_PASSWORD_NOT_PRESENT"}, status=status.HTTP_400_BAD_REQUEST)
        elif newPassword == None:
            return Response({'error': "New_PASSWORD_NOT_PRESENT"}, status=status.HTTP_400_BAD_REQUEST)
        elif newPassword != newPassword1:
            return Response({'error': "PASSWORD_NOT_MATCH"}, status=status.HTTP_400_BAD_REQUEST)
        elif newPassword == oldPassword:
            return Response({'error': "SAME_OLD_NEW_PASSWORD"}, status=status.HTTP_400_BAD_REQUEST)
        elif not check_password(password=oldPassword, encoded=user.password):
            return Response({'error': "INCORRECT_OLD_PASSWORD"}, status=status.HTTP_403_FORBIDDEN)
        else:
            try:
                user.password = make_password(newPassword)
                user.save()
                return Response({'detail': "Password updated successfully"})
            except:
                return Response({'detail': "An Unknown error occurred."})


@api_view(['GET'])
# @permission_classes([permissions.IsAuthenticated])
def get_tab(request):
    if not request.user.is_authenticated:
        response = [{'name': 'home', 'link': 'home'},
                    {'name': 'login', 'link': 'auth'},
               ]
    else:
        if request.user.user_type == 1:
            response = [{'name': 'dashboard', 'link': 'admin/dashboard'},
                        {'name': 'donor', 'link': 'admin/donor'},
                        {'name': 'patient', 'link': 'admin/patient'},
                        {'name': 'blood donate details', 
                         'link': 'admin/blood-donate-details'},
                        {'name': 'blood request details', 
                         'link': 'admin/blood-request-details'},
                        {'name': 'blood request history', 
                         'link': 'admin/blood-request-history'},
                        {'name': 'blood donate history', 
                         'link': 'blood-donate-history'},
                        {'name': 'blood stock', 'link': 'admin/blood-stock'},
                        {'name': 'logout', 'link': 'logout'},
                       ]
            if request.user.username == 'admin':
                response.insert(1,{'name': 'admin', 'link': 'admin/admin'})
        elif request.user.user_type == 2:
            response = [{'name': 'dashboard', 'link': 'donor/dashboard'},
                        {'name': 'donate blood', 'link': 'donor/donate-blood'},
                        {'name': 'donate blood history', 
                         'link': 'donor/donate-blood-history'},
                        {'name': 'request blood', 'link': 'donor/request-blood'},
                        {'name': 'request blood history', 
                         'link': 'donor/request-blood-history'},
                        {'name': 'logout', 'link': 'logout'},
                       ]
        elif request.user.user_type == 3:
            response = [{'name': 'dashboard', 'link': 'patient/dashboard'},
                        {'name': 'request blood', 'link': 'patient/request-blood'},
                        {'name': 'request blood history', 
                         'link': 'patient/request-blood-history'},
                        {'name': 'logout', 'link': 'logout'},
                       ]
    return Response(response, status=status.HTTP_200_OK)