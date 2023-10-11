from django.db import models

from auth.models import User


class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    blood_group = models.ForeignKey(
        'blood.BloodGroup', on_delete=models.RESTRICT)
    profile_pic = models.ImageField(
        upload_to='profile_pic/patients', null=True, blank=True)

    class Meta:
        db_table = 'bbm_patient'

    def __str__(self):
        return f"{self.user.username}"
