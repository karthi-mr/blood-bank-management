import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { BloodGroup } from '../shared/shared.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy{

  loginForm!: FormGroup;
  registerForm !: FormGroup;

  authType: string = 'login';

  bloodGroups: BloodGroup[] = []
  bloodGroupSubscription!: Subscription;

  constructor(private authService: AuthService,
              private sharedService: SharedService,
              private router: Router,
              private route: ActivatedRoute
             ) {}

  ngOnInit(): void {
    this.initLoginForm();
    this.initRegisterForm();

    this.sharedService.get_blood_group().subscribe()

    this.bloodGroupSubscription = 
        this.sharedService.blood_groups.subscribe((data: BloodGroup[]) => {
      // console.log(data);
      this.bloodGroups = data;
    })
  }

  ngOnDestroy(): void {
      this.bloodGroupSubscription.unsubscribe()
  }

  initLoginForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  initRegisterForm(): void {
    this.registerForm = new FormGroup({
      user: new FormGroup({
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        mobile: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        user_type: new FormControl('', [Validators.required])
      }),
      date_of_birth: new FormControl('', [Validators.required]),
      blood_group: new FormControl('', [Validators.required]),
      // profile_pic: new FormControl('', [Validators.required]),
    })
  }

  onSubmitLoginForm(): void {
    this.authService.login_user(this.loginForm.value).subscribe({
      next: (data: any) => {
        // this.router.navigate(['/home'], {relativeTo: this.route})
      }
    })
  }

  onSubmitRegisterForm(): void {
    this.authService.register_user(this.registerForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
      }
    })
  }

  changeAuthType(): void {
    this.authType = (this.authType == 'login')? 'register': 'login';
  }
}
