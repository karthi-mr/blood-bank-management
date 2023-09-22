import { DonorService } from './../donor.service';
import { Component, OnInit } from '@angular/core';
import { DonateHistory } from '../donor.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { BloodGroup } from 'src/app/shared/shared.model';

@Component({
  selector: 'app-donate-blood',
  templateUrl: './donate-blood.component.html',
  styleUrls: ['./donate-blood.component.scss']
})
export class DonateBloodComponent implements OnInit{

  donateRequests: DonateHistory[] = [];
  userType: number | undefined = undefined;

  constructor(private donorService: DonorService, 
              private authService: AuthService,
              private adminService: AdminService,
              private router: Router,
              private route: ActivatedRoute
             ) {}

  ngOnInit(): void {
    this.getAllBloodDonateRequests();
  }

  getAllBloodDonateRequests(): void {
    this.donorService.get_blood_donate_requests().subscribe({
      next: (data: DonateHistory[]) => {
        // console.log(data.length);
        this.donateRequests = data;
      }
    })
    this.userType = this.authService.get_user_type();
  }

  onClickDonateBlood(): void {
    this.router.navigate(['../donate-blood-add'], {relativeTo: this.route})
  }

  onApproveRequest(id: number, blood_group: BloodGroup, unit: number): void {
    this.donorService.update_status_donate_requests({id: id, status: 1}).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.adminService.update_stock({blood_group: blood_group.id, unit: unit}).subscribe({
          next: (data: any) => {
            console.log(data)
          }
        })
        this.getAllBloodDonateRequests();
      }
    });
  }

  onRejectRequest(id: number): void {
    this.donorService.update_status_donate_requests({id: id, status: 3}).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.getAllBloodDonateRequests();
      }
    });
  }
}
