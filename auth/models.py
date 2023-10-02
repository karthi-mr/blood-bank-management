from django.contrib.auth.models import AbstractUser
from django.db import models

USER_TYPE = [
    (1, 'admin'),
    (2, 'donor'),
    (3, 'patient')
]

class User(AbstractUser):
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=10, unique=True)
    user_type = models.IntegerField(choices=USER_TYPE)
    address = models.TextField(max_length=500, null=True, blank=True)

    class Meta:
        db_table = 'bbm_user'

    @property
    def get_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return f"{self.username}"