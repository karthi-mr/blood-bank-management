from datetime import date

from django.db import models

from donor.models import Donor
from patient.models import Patient

BLOOD_DONATE_STATUS = [
    (1, 'Approved'),
    (2, 'Pending'),
    (3, 'Rejected')
]


class BloodGroup(models.Model):
    blood_group = models.CharField(max_length=10, unique=True)

    class Meta:
        db_table = 'bbm_blood_group'

    def __str__(self):
        return f"{self.blood_group}"


class Stock(models.Model):
    blood_group = models.OneToOneField(BloodGroup, on_delete=models.RESTRICT)
    unit = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'bbm_stock'

    def __str__(self):
        return f"{self.blood_group}"


class Branch(models.Model):
    name = models.CharField(max_length=150)
    address = models.TextField()
    mobile = models.CharField(max_length=10)
    added = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'bbm_branch'

    def __str__(self):
        return f"{self.name}"


class BloodRequest(models.Model):
    request_by_patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, null=True, blank=True)
    request_by_donor = models.ForeignKey(
        Donor, on_delete=models.CASCADE, null=True, blank=True)
    patient_name = models.CharField(max_length=50)
    patient_age = models.PositiveIntegerField()
    reason = models.TextField(max_length=500)
    reject_reason = models.TextField(
        max_length=500, null=True, blank=True, default='')
    request_branch = models.ForeignKey(
        Branch, on_delete=models.PROTECT)
    blood_group = models.ForeignKey(BloodGroup, on_delete=models.RESTRICT)
    unit = models.PositiveIntegerField(default=0)
    status = models.IntegerField(choices=BLOOD_DONATE_STATUS, default=2)
    added = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'bbm_blood_request'

    def __str__(self):
        return f"{self.patient_name}"


class BloodDonate(models.Model):
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    disease = models.CharField(max_length=100, default="Nothing")
    age = models.PositiveIntegerField()
    blood_group = models.ForeignKey(
        BloodGroup, on_delete=models.RESTRICT)
    reject_reason = models.TextField(
        max_length=500, null=True, blank=True, default='')
    donate_branch = models.ForeignKey(
        Branch, on_delete=models.PROTECT)
    unit = models.PositiveIntegerField(default=0)
    status = models.IntegerField(choices=BLOOD_DONATE_STATUS, default=2)
    added = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'bbm_blood_donate'

    def __str__(self):
        return f"{self.donor.user.username}"

    @property
    def calculate_age(self):
        today = date.today()
        age = today.year - self.donor.date_of_birth.year - \
            ((today.month, today.day) <
             (self.donor.date_of_birth.month, self.donor.date_of_birth.day))

        return age
