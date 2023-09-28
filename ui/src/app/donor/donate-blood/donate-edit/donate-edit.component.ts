import { DonateBlood } from './../../donor.model';
import { SharedService } from './../../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BloodGroup } from 'src/app/shared/shared.model';
import { DonorService } from '../../donor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-donate-edit',
  templateUrl: './donate-edit.component.html',
  styleUrls: ['./donate-edit.component.scss']
})
export class DonateEditComponent implements OnInit{

  donateBloodForm!: FormGroup;
  bloodGroups: BloodGroup[] = [];

  constructor(private sharedService: SharedService,
              private donorService: DonorService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.initBloodDonateForm();
      this.sharedService.get_blood_group().subscribe({
        next: (data: any) => {
          console.log(data);
          this.bloodGroups = data;
        }
      });
  }

  initBloodDonateForm(): void {
    this.donateBloodForm = new FormGroup({
      age: new FormControl('', [Validators.required]),
      disease: new FormControl('' , []),
      unit: new FormControl('', [Validators.required]),
      blood_group_id: new FormControl('', [Validators.required]),
    })
  }

  onSubmitBloodDonateForm(): void {
    const donateBlood: DonateBlood = this.donateBloodForm.value;

    if(donateBlood.disease == '') {
      donateBlood.disease = "Nothing";
    }
    
    this.donorService.donate_blood(this.donateBloodForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate(['../'], {relativeTo: this.route})
      }
    });
  }
}
