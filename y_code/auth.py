from django.contrib.auth.hashers import make_password

from admin.models import Admin
from auth.models import User

user_admin = User.objects.create(username = "admin",
                                 email = "admin@bbm.com",
                                 password = make_password("admin"),
                                 mobile = "7845125851",
                                 is_superuser = True,
                                 is_staff = True,
                                 is_active = True,
                                 user_type = 1
                                )

user_a = User.objects.create(username = "a",
                             email = "a@bbm.com",
                             password = make_password("a"),
                             mobile = "7845125852",
                             is_superuser = True,
                             is_staff = True,
                             is_active = True,
                             user_type = 1
                            )

admin_user_admin = Admin.objects.create(user = user_admin)
admin_user_a = Admin.objects.create(user = user_a)