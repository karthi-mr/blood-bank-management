from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import BloodGroup, Stock


@receiver(post_save, sender=BloodGroup)
def create_stock(sender, instance, created, **kwargs):
    if created:
        Stock.objects.create(blood_group=instance)