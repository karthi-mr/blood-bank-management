from django.contrib import admin

from .models import BloodDonate, BloodGroup, BloodRequest, Stock


class StockAdmin(admin.ModelAdmin):
    list_display = ['blood_group', 'unit']


class BloodRequestAdmin(admin.ModelAdmin):
    list_display = ['patient_name', 'reason', 'blood_group', 'status']


class BloodDonateAdmin(admin.ModelAdmin):
    list_display = ['id', 'donor', 'disease', 'blood_group', 'unit', 'status']


admin.site.register(BloodGroup)
admin.site.register(BloodRequest, BloodRequestAdmin)
admin.site.register(Stock, StockAdmin)
admin.site.register(BloodDonate, BloodDonateAdmin)
