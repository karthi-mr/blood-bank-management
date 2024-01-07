import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';

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
  isLoading: boolean = false;

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
    this.isLoading = true;
    this.adminService.addAdmin(this.adminForm.value).subscribe({
      next: (data: { message: string }) => {
        this.isLoading = false;
        this.errorMessage = undefined;
        this.successMessage = data.message;
      },
      error: (errorRes: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorMessage = errorRes.message;
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
