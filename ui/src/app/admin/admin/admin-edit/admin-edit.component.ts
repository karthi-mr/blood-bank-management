import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss'],
})
export class AdminEditComponent implements OnInit {
  //
  adminForm!: FormGroup;

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
        console.log(data);
      },
    });
  }

  onClickCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
