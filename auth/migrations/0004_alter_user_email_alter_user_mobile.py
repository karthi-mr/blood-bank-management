# Generated by Django 4.2.4 on 2023-10-05 12:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth1', '0003_alter_user_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254),
        ),
        migrations.AlterField(
            model_name='user',
            name='mobile',
            field=models.CharField(max_length=10),
        ),
    ]
