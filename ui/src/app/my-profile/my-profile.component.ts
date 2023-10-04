import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { MyProfile } from './profile.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  myProfile!: MyProfile;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData(): void {
    this.profileService.get_my_profile().subscribe({
      next: (data: MyProfile) => {
        this.myProfile = data;
      },
    });
  }
}
