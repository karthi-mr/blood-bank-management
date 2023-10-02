from datetime import datetime
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import authentication, generics, permissions, status
from rest_framework.decorators import APIView, api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView

from admin.models import Admin
from admin.serializers import AdminSerializer
from donor.models import Donor
from donor.serializers import DonorSerializer
from patient.models import Patient
from patient.serializers import PatientSerializer

from .models import User
from .serializers import MyTokenObtainPairSerializer, UserSerializer


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
    authentication_classes = [
        authentication.BasicAuthentication, JWTAuthentication]

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
        response = [{'name': 'home', 'link': 'home',
                     'icon': 'fa-solid fa-house'},
                    {'name': 'login', 'link': 'auth',
                     'icon': 'fa-solid fa-arrow-right-to-bracket'},
                    ]
    else:
        if request.user.user_type == 1:
            response = [{'name': 'dashboard', 'link': 'admin/dashboard',
                         'icon': 'fa-solid fa-chart-line'},
                        {'name': 'donor', 'link': 'admin/donor',
                         'icon': 'fa-solid fa-user'},
                        {'name': 'patient', 'link': 'admin/patient',
                         'icon': 'fa-solid fa-user-injured'},
                        {'name': 'blood donate details',
                         'link': 'admin/donate-blood',
                         'icon': 'fa-solid fa-hand-holding-medical'},
                        {'name': 'blood request details',
                         'link': 'admin/request-blood',
                         'icon': 'fa-solid fa-rotate'},
                        # {'name': 'blood request history',
                        #  'link': 'admin/request-blood-history'},
                        # {'name': 'blood donate history',
                        #  'link': 'admin/donate-blood-history'},
                        {'name': 'blood stock', 'link': 'admin/blood-stock',
                         'icon': 'fa-solid fa-hand-holding-droplet'},
                        ]
            if request.user.username == 'admin':
                response.insert(1, {'name': 'admin', 'link': 'admin/admin'})
        elif request.user.user_type == 2:
            response = [{'name': 'dashboard', 'link': 'donor/dashboard',
                         'icon': 'fa-solid fa-chart-line'},
                        {'name': 'donate blood', 'link': 'donor/donate-blood',
                         'icon': 'fa-solid fa-hand-holding-medical'},
                        # {'name': 'donate blood history',
                        #  'link': 'donor/donate-blood-history'},
                        {'name': 'request blood', 'link': 'donor/request-blood',
                         'icon': 'fa-solid fa-rotate'},
                        # {'name': 'request blood history',
                        #  'link': 'donor/request-blood-history'},
                        ]
        elif request.user.user_type == 3:
            response = [{'name': 'dashboard', 'link': 'patient/dashboard',
                         'icon': 'fa-solid fa-chart-line'},
                        {'name': 'request blood', 'link': 'patient/request-blood',
                         'icon': 'fa-solid fa-rotate'},
                        # {'name': 'request blood history',
                        #  'link': 'patient/request-blood-history'},
                        ]
    return Response(response, status=status.HTTP_200_OK)


def get_inactive_date(time) -> str: # calculate inactive with last login
    if not time:
        return "You're not active."

    date_format = "%Y-%m-%d"
    today = datetime.strptime(str(datetime.now().date()), date_format)
    last_login = datetime.strptime(str(time.date()), date_format)
    delta = today - last_login
    return f"You're inactive since {delta.days} days"

def calculate_age(dob) -> int: # calculate age of a person
    date_format = "%Y-%m-%d"
    today = datetime.strptime(str(datetime.now().date()), date_format)
    dob_date = datetime.strptime(str(dob), date_format)
    if today.month < dob_date.month or \
            (today.month == dob_date.month and today.day < dob_date.day):
            delta = today.year - dob_date.year - 1
    else:
            delta = today.year - dob_date.year
    return delta

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_my_profile(request):
    user = get_object_or_404(User, pk=request.user.pk)
    serializer = UserSerializer(user)
    age = "Age can't be calculated."

    if user.user_type == 1:
        admin = Admin.objects.get(user=user)
        serializer = AdminSerializer(admin)
    elif user.user_type == 2:
        donor = Donor.objects.get(user=user)
        serializer = DonorSerializer(donor)
        age = calculate_age(donor.date_of_birth)
    elif user.user_type == 3:
        patient = Patient.objects.get(user=user)
        serializer = PatientSerializer(patient)
        age = calculate_age(patient.date_of_birth)

    response = {'detail': "Profile Settings",
                'age': age,
                'user': serializer.data
               }

    return Response(response, status=status.HTTP_200_OK)
