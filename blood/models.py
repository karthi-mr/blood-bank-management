from django.db import models

from donor.models import BLOOD_DONATE_STATUS, Donor
from patient.models import Patient


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


class BloodRequest(models.Model):
    request_by_patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True)
    request_by_donor = models.ForeignKey(Donor, on_delete=models.CASCADE, null=True, blank=True)
    patient_name = models.CharField(max_length=50)
    patient_age = models.PositiveIntegerField()
    reason = models.TextField(max_length=500)
    blood_group = models.ForeignKey(BloodGroup, on_delete=models.RESTRICT)
    unit = models.PositiveIntegerField(default=0)
    status = models.IntegerField(choices=BLOOD_DONATE_STATUS, default=2)
    added = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'bbm_blood_request'

    def __str__(self):
        return f"{self.patient_name}"
