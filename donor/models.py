from django.db import models

from auth.models import User


class Donor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    blood_group = models.ForeignKey('blood.BloodGroup', on_delete=models.RESTRICT)
    profile_pic = models.ImageField(upload_to='profile_pic/donor', null=True, blank=True)

    class Meta:
        db_table = 'bbm_donor'

    def __str__(self):
        return f"{self.user.username}"


BLOOD_DONATE_STATUS = [
    (1, 'Approved'),
    (2, 'Pending'),
    (3, 'Rejected')
]

class BloodDonate(models.Model):
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    disease = models.CharField(max_length=100, default="Nothing")
    age = models.PositiveIntegerField()
    blood_group = models.ForeignKey('blood.BloodGroup', on_delete=models.RESTRICT)
    unit = models.PositiveIntegerField(default=0)
    status = models.IntegerField(choices=BLOOD_DONATE_STATUS, default=2)
    added = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'bbm_blood_donate'

    def __str__(self):
        return f"{self.donor.user.username}"