from django.db import models

from auth.models import User


class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_pic = models.ImageField(
        upload_to='profile_pic/admin', null=True, blank=True)

    class Meta:
        db_table = 'bbm_admin'

    def __str__(self):
        return f"{self.user}"
