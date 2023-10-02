from django.contrib import admin

from .models import BloodGroup, Stock, BloodRequest


class StockAdmin(admin.ModelAdmin):
    list_display = ['blood_group', 'unit']


class BloodRequestAdmin(admin.ModelAdmin):
    list_display = ['patient_name', 'reason', 'blood_group', 'status']


admin.site.register(BloodGroup)
admin.site.register(BloodRequest, BloodRequestAdmin)
admin.site.register(Stock, StockAdmin)
