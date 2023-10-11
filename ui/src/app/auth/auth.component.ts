import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BloodGroup } from '../shared/shared.model';
import { SharedService } from '../shared/shared.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  authType: string = 'login';
  loginErrorMessage: string | undefined;
  registerErrorMessage: string | undefined;
  registerSuccessMessage: string | undefined;
  bloodGroups: BloodGroup[] = [];
  bloodGroupSubscription!: Subscription;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
    this.initRegisterForm();
    this.sharedService.get_blood_group().subscribe();
    this.bloodGroupSubscription = this.sharedService.blood_groups.subscribe(
      (data: BloodGroup[]) => {
        this.bloodGroups = data;
      }
    );
  }

  ngOnDestroy(): void {
    this.bloodGroupSubscription.unsubscribe();
  }

  initLoginForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  initRegisterForm(): void {
    this.registerForm = new FormGroup({
      user: new FormGroup({
        first_name: new FormControl('', []),
        last_name: new FormControl('', []),
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        mobile: new FormControl('', [Validators.required]),
        address: new FormControl('', []),
        password: new FormControl('', [Validators.required]),
        user_type: new FormControl('', [Validators.required]),
      }),
      date_of_birth: new FormControl('', [Validators.required]),
      blood_group_id: new FormControl('', [Validators.required]),
    });
  }

  onSubmitLoginForm(): void {
    this.isLoading = true;
    this.authService.login_user(this.loginForm.value).subscribe({
      next: (data: any) => {
        this.isLoading = false;
      },
      error: (errorRes: HttpErrorResponse) => {
        this.isLoading = false;
        this.loginErrorMessage = errorRes.message;
      },
    });
  }

  onSubmitRegisterForm(): void {
    this.isLoading = true;
    this.authService.register_user(this.registerForm.value).subscribe({
      next: (data: { message: string }) => {
        this.isLoading = false;
        this.registerSuccessMessage = data.message;
      },
      error: (errorRes: HttpErrorResponse) => {
        this.isLoading = false;
        this.registerErrorMessage = errorRes.message;
      },
    });
  }

  changeAuthType(): void {
    this.authType = this.authType == 'login' ? 'register' : 'login';
  }

  onCloseErrorMessage(): void {
    this.loginErrorMessage = undefined;
    this.registerErrorMessage = undefined;
    this.registerSuccessMessage = undefined;
  }
}
