from blood.models import BloodGroup, Stock

blood_aplus = BloodGroup.objects.create(blood_group = 'A+')
blood_aneg = BloodGroup.objects.create(blood_group = 'A-')

blood_bplus = BloodGroup.objects.create(blood_group = 'B+')
blood_bneg = BloodGroup.objects.create(blood_group = 'B-')

blood_oplus = BloodGroup.objects.create(blood_group = 'O+')
blood_oneg = BloodGroup.objects.create(blood_group = 'O-')

blood_abplus = BloodGroup.objects.create(blood_group = 'AB+')
blood_abneg = BloodGroup.objects.create(blood_group = 'AB-')

blood_aplus_stock = Stock.objects.get(blood_group=blood_aplus)
blood_aplus_stock.unit = 10
blood_aplus_stock.save()
blood_aneg_stock = Stock.objects.get(blood_group=blood_aneg)
blood_aneg_stock.unit = 5
blood_aneg_stock.save()

blood_bplus_stock = Stock.objects.get(blood_group=blood_bplus)
blood_bplus_stock.unit = 25
blood_bplus_stock.save()
blood_bneg_stock = Stock.objects.get(blood_group=blood_bneg)
blood_bneg_stock.unit = 1
blood_bneg_stock.save()

blood_oplus_stock = Stock.objects.get(blood_group=blood_oplus)
blood_oplus_stock.unit = 12
blood_oplus_stock.save()
blood_oneg_stock = Stock.objects.get(blood_group=blood_oneg)
blood_oneg_stock.unit = 37
blood_oneg_stock.save()

blood_abplus_stock = Stock.objects.get(blood_group=blood_abplus)
blood_abplus_stock.unit = 1
blood_abplus_stock.save()
blood_abneg_stock = Stock.objects.get(blood_group=blood_abneg)
blood_abneg_stock.unit = 0
blood_abneg_stock.save()