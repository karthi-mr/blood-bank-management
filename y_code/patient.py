from datetime import datetime, timedelta
from django.contrib.auth.hashers import make_password

import random

from patient.models import Patient
from auth.models import User
from blood.models import BloodGroup

def random_number(N):
    minimum = pow(10, N-1)
    maximum = pow(10, N) - 1
    return random.randint(minimum, maximum)

blood_groups = BloodGroup.objects.all()

dob = []
dob.append(datetime.now() - timedelta(days=10000))
dob.append(datetime.now() - timedelta(days=20000))
dob.append(datetime.now() - timedelta(days=1000))
dob.append(datetime.now() - timedelta(days=7000))
dob.append(datetime.now() - timedelta(days=8000))
dob.append(datetime.now() - timedelta(days=4000))

# user_1 = User.objects.create(username = "donor_124",
#                                  email = "donor_124@bbm.com",
#                                  password = make_password("admin"),
#                                  mobile = "7845125822",
#                                  is_superuser = False,
#                                  is_staff = False,
#                                  is_active = True,
#                                  user_type = 2
#                             )
# donor1 = Donor.objects.create(user=user_1, 
#                               date_of_birth = datetime.now(), 
#                               blood_group = blood_groups[1]
#                              )

for i in range(196, 199):
    user = User.objects.create(username = f"custom_patient_{i}",
                               email = f"custom_patient_{i}@bbm.com",
                               password = make_password('a'),
                               mobile = random_number(10),
                               is_active = True,
                               user_type = 2 
                              )
    Patient.objects.create(user = user, 
                         date_of_birth = random.choice(dob),
                         blood_group = random.choice(blood_groups))
    