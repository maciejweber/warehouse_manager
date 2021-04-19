# Generated by Django 3.1.7 on 2021-04-15 00:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_auto_20210414_0000'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='company',
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('1', 'Waiting for delivery'), ('2', 'In warehouse'), ('3', 'Issued')], default='1', max_length=1),
        ),
    ]
