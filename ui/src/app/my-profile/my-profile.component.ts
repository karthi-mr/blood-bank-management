import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { MyProfile } from './profile.model';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  myProfile!: MyProfile;
  isEditMode: boolean = false;
  profileForm!: FormGroup;
  successMessage: string | undefined;
  errorMessage: string | undefined;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfileData();
    // this.initProfileForm();
  }

  loadProfileData(): void {
    this.profileService.myProfile().subscribe({
      next: (data: MyProfile) => {
        this.myProfile = data;
        this.initProfileForm();
      },
    });
  }

  onClickEdit(isEdit: boolean): void {
    this.isEditMode = isEdit;
    this.initProfileForm();
  }

  initProfileForm(): void {
    this.profileForm = new FormGroup({
      user: new FormGroup({
        first_name: new FormControl({
          value: this.myProfile.user.user.first_name,
          disabled: !this.isEditMode,
        }),
        last_name: new FormControl({
          value: this.myProfile.user.user.last_name,
          disabled: !this.isEditMode,
        }),
        email: new FormControl({
          value: this.myProfile.user.user.email,
          disabled: true,
        }),
        mobile: new FormControl({
          value: this.myProfile.user.user.mobile,
          disabled: !this.isEditMode,
        }),
        address: new FormControl({
          value: this.myProfile.user.user.address,
          disabled: !this.isEditMode,
        }),
      }),
      date_of_birth: new FormControl({
        value: this.myProfile.user.date_of_birth,
        disabled: !this.isEditMode,
      }),
    });
  }

  onSubmitForm(): void {
    if (this.myProfile.user.user.user_type == 1) {
      delete this.profileForm.value['date_of_birth'];
    }
    this.profileForm.value['id'] = this.myProfile.user.id;
    this.profileForm.value['user']['user_type'] =
      this.myProfile.user.user.user_type;
    this.profileService.updateUser(this.profileForm.value).subscribe({
      next: (data: any) => {
        this.successMessage = data.detail;
        this.errorMessage = undefined;
        this.loadProfileData();
        this.onClickEdit(false);
      },
      error: (errorRes: HttpErrorResponse) => {
        this.successMessage = undefined;
        this.errorMessage = errorRes.message;
      },
    });
  }

  onCloseMessage(): void {
    this.successMessage = undefined;
    this.errorMessage = undefined;
  }
}
