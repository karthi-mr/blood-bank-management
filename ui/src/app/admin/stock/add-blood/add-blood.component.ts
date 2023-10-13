import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-blood',
  templateUrl: './add-blood.component.html',
  styleUrls: ['./add-blood.component.scss'],
})
export class AddBloodComponent implements OnInit {
  addBloodForm!: FormGroup;
  errorMessage: string | undefined;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onCloseError(): void {
    this.errorMessage = undefined;
  }

  initForm(): void {
    this.addBloodForm = new FormGroup({
      blood_group: new FormControl('', [Validators.required]),
    });
  }

  onSubmitForm(): void {
    this.adminService.addBloodGroup(this.addBloodForm.value).subscribe({
      next: (data: any) => {
        this.onCloseError();
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
}
