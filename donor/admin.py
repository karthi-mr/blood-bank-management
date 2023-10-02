from django.contrib import admin

from .models import Donor, BloodDonate


class DonorAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'date_of_birth', 'blood_group']


class BloodDonateAdmin(admin.ModelAdmin):
    list_display = ['id', 'donor', 'disease', 'blood_group', 'unit', 'status']


admin.site.register(Donor, DonorAdmin)
admin.site.register(BloodDonate, BloodDonateAdmin)
