# Generated by Django 4.2.4 on 2023-10-13 08:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blood', '0008_alter_blooddonate_donate_branch_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blooddonate',
            name='reject_reason',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='bloodgroup',
            name='blood_group',
            field=models.CharField(error_messages={'unique': 'BLOOD_NOT_UNIQUE'}, max_length=10, unique=True),
        ),
        migrations.AlterField(
            model_name='bloodrequest',
            name='reason',
            field=models.CharField(max_length=150),
        ),
    ]
