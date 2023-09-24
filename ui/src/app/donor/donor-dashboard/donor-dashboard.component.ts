import { Component, OnInit } from '@angular/core';
import { DonorService } from '../donor.service';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-donor-dashboard',
  templateUrl: './donor-dashboard.component.html',
  styleUrls: ['./donor-dashboard.component.scss']
})
export class DonorDashboardComponent implements OnInit{
  
  title: string = "Donor Dashboard";
  totalDonate: number = 0;
  totalRequest: number = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
      this.getAllCount();
  }

  getAllCount(): void {
    this.adminService.get_total_donate_blood().subscribe({
      next: (data: {total_donate: number}) => {
        // console.log(data);
        this.totalDonate = data.total_donate;
      }
    });
    this.adminService.get_total_request_blood().subscribe({
      next: (data: {total_request: number}) => {
        // console.log(data);
        this.totalRequest = data.total_request;
      }
    });
  }
}
