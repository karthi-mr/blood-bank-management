from django.contrib import admin

from .models import Patient


class PatientAdmin(admin.ModelAdmin):
    list_display = ['user', 'date_of_birth', 'blood_group']

admin.site.register(Patient, PatientAdmin)