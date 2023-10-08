from django.contrib import admin

from .models import BloodDonate, BloodGroup, BloodRequest, Branch, Stock


class StockAdmin(admin.ModelAdmin):
    list_display = ['blood_group', 'unit']


class BloodRequestAdmin(admin.ModelAdmin):
    list_display = ['patient_name', 'reason', 'blood_group', 'status']


class BloodDonateAdmin(admin.ModelAdmin):
    list_display = ['id', 'donor', 'disease', 'blood_group', 'unit', 'status']


class BranchAdmin(admin.ModelAdmin):
    list_display = ['name', 'mobile', 'added']


admin.site.register(BloodDonate, BloodDonateAdmin)
admin.site.register(BloodGroup)
admin.site.register(BloodRequest, BloodRequestAdmin)
admin.site.register(Branch, BranchAdmin)
admin.site.register(Stock, StockAdmin)
