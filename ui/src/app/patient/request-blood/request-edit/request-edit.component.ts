import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BloodGroup } from 'src/app/shared/shared.model';
import { SharedService } from 'src/app/shared/shared.service';
import { PatientService } from '../../patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch, RequestBlood } from '../../patient.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.scss'],
})
export class RequestEditComponent {
  requestBloodForm!: FormGroup;
  bloodGroups: BloodGroup[] = [];
  branches: Branch[] = [];
  selectedBranch!: Branch;
  errorMessage: string | undefined;

  constructor(
    private sharedService: SharedService,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initRequestForm();
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

  initRequestForm(): void {
    this.requestBloodForm = new FormGroup({
      patient_name: new FormControl('', [Validators.required]),
      patient_age: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      blood_group_id: new FormControl('', [Validators.required]),
      request_branch_id: new FormControl('', [Validators.required]),
    });
    this.requestBloodForm.valueChanges.subscribe((changes: any) => {
      if (!this.selectedBranch && changes['request_branch_id']) {
        this.onGetBranchDetail(changes['request_branch_id']);
      }
      if (
        this.selectedBranch &&
        changes['request_branch_id'] != this.selectedBranch['id']
      ) {
        this.onGetBranchDetail(changes['request_branch_id']);
      }
    });
  }

  onSubmitBloodRequestForm(): void {
    this.patientService.requestBlood(this.requestBloodForm.value).subscribe({
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

  onGetBranchDetail(id: number): void {
    this.sharedService.branchDetail(id).subscribe({
      next: (data: Branch) => {
        this.selectedBranch = data;
      },
    });
  }

  onCloseError(): void {
    this.errorMessage = undefined;
  }
}
