from django.contrib import admin

from .models import Admin


class AdminAdmin(admin.ModelAdmin):
    list_display = ['user']


admin.site.register(Admin, AdminAdmin)
