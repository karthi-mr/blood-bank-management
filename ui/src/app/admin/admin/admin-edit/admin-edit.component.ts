import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss'],
})
export class AdminEditComponent implements OnInit {
  //
  adminForm!: FormGroup;
  errorMessage: string | undefined;
  successMessage: string | undefined;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initAdminForm();
  }

  initAdminForm(): void {
    this.adminForm = new FormGroup({
      user: new FormGroup({
        first_name: new FormControl('', []),
        last_name: new FormControl('', []),
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        mobile: new FormControl('', [Validators.required]),
        address: new FormControl('', []),
        password: new FormControl('', [Validators.required]),
        user_type: new FormControl({ value: '1', disabled: true }, [
          Validators.required,
        ]),
      }),
    });
  }

  onSubmitAdminForm(): void {
    // console.log(this.adminForm.value);
    this.adminService.add_admin(this.adminForm.value).subscribe({
      next: (data: any) => {
        this.successMessage = 'Admin Created Successfully.';
      },
      error: (errRes: HttpErrorResponse) => {
        const error = errRes.error.user;
        if (error.username) {
          this.errorMessage = error.username[0];
        } else if (error.email) {
          this.errorMessage = error.email[0];
        } else if (error.mobile) {
          this.errorMessage = error.mobile[0];
        }
      },
    });
  }

  onClickCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCloseAlert(): void {
    this.errorMessage = undefined;
    this.successMessage = undefined;
  }
}
