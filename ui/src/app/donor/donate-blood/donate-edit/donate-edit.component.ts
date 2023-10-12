import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BloodGroup, Branch } from 'src/app/shared/shared.model';
import { DonorService } from '../../donor.service';
import { SharedService } from './../../../shared/shared.service';
import { DonateBlood } from './../../donor.model';

@Component({
  selector: 'app-donate-edit',
  templateUrl: './donate-edit.component.html',
  styleUrls: ['./donate-edit.component.scss'],
})
export class DonateEditComponent implements OnInit {
  donateBloodForm!: FormGroup;
  bloodGroups: BloodGroup[] = [];
  branches: Branch[] = [];
  selectedBranch!: Branch;
  errorMessage: string | undefined;

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
    this.sharedService.bloodGroupList().subscribe({
      next: (data: any) => {
        this.bloodGroups = data;
      },
    });
  }

  getBranch(): void {
    this.sharedService.branchList().subscribe({
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
    this.donateBloodForm.valueChanges.subscribe((changes: any) => {
      if (!this.selectedBranch && changes['donate_branch_id']) {
        this.onGetBranchDetail(changes['donate_branch_id']);
      }
      if (
        this.selectedBranch &&
        changes['donate_branch_id'] != this.selectedBranch['id']
      ) {
        this.onGetBranchDetail(changes['donate_branch_id']);
      }
    });
  }

  onSubmitBloodDonateForm(): void {
    const donateBlood: DonateBlood = this.donateBloodForm.value;
    if (donateBlood.disease == '') {
      donateBlood.disease = 'Nothing';
    }

    this.donorService.donateBlood(this.donateBloodForm.value).subscribe({
      next: (data: any) => {
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (errorRes: HttpErrorResponse) => {
        this.errorMessage = errorRes.message;
      },
    });
  }

  onClickCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCloseError(): void {
    this.errorMessage = undefined;
  }

  onGetBranchDetail(id: number): void {
    this.sharedService.branchDetail(id).subscribe({
      next: (data: Branch) => {
        this.selectedBranch = data;
      },
    });
  }
}
