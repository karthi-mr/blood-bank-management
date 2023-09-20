from django.apps import AppConfig


class BloodConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'blood'

    def ready(self) -> None:
        import blood.signals