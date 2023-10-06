from django.contrib import admin

from .models import Donor


class DonorAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'date_of_birth', 'blood_group']


admin.site.register(Donor, DonorAdmin)
