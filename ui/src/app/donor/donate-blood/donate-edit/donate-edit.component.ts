import { DonateBlood } from './../../donor.model';
import { SharedService } from './../../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BloodGroup, Branch } from 'src/app/shared/shared.model';
import { DonorService } from '../../donor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-donate-edit',
  templateUrl: './donate-edit.component.html',
  styleUrls: ['./donate-edit.component.scss'],
})
export class DonateEditComponent implements OnInit {
  donateBloodForm!: FormGroup;
  bloodGroups: BloodGroup[] = [];
  branches: Branch[] = [];

  constructor(
    private sharedService: SharedService,
    private donorService: DonorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initBloodDonateForm();
    this.getBloodGroup();
    this.getBranch();
  }

  getBloodGroup(): void {
    this.sharedService.get_blood_group().subscribe({
      next: (data: any) => {
        this.bloodGroups = data;
      },
    });
  }

  getBranch(): void {
    this.sharedService.get_branch().subscribe({
      next: (data: any) => {
        this.branches = data;
      },
    });
  }

  initBloodDonateForm(): void {
    this.donateBloodForm = new FormGroup({
      age: new FormControl('', [Validators.required]),
      disease: new FormControl('', []),
      unit: new FormControl('', [Validators.required]),
      blood_group_id: new FormControl('', [Validators.required]),
      donate_branch_id: new FormControl('', [Validators.required]),
    });
  }

  onSubmitBloodDonateForm(): void {
    const donateBlood: DonateBlood = this.donateBloodForm.value;

    if (donateBlood.disease == '') {
      donateBlood.disease = 'Nothing';
    }

    this.donorService.donate_blood(this.donateBloodForm.value).subscribe({
      next: (data: any) => {
        this.router.navigate(['../'], { relativeTo: this.route });
      },
    });
  }

  onClickCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
