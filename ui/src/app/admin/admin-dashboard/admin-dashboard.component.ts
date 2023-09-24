import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { BloodGroup } from 'src/app/shared/shared.model';
import { BloodStock } from '../admin.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{
  
  title: string = "Admin Dashboard"
  totalDonate: number = 0;
  totalRequest: number = 0;
  totalDonor: number = 0;
  totalPatient: number = 0;
  bloodGroupStocks: BloodStock[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
      this.getAllCount();
      this.getAllBloodGroupCount();
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
    this.adminService.get_total_donor().subscribe({
      next: (data: {total_donor: number}) => {
        // console.log(data);
        this.totalDonor = data.total_donor;
      }
    });
    this.adminService.get_total_patient().subscribe({
      next: (data: {total_patient: number}) => {
        // console.log(data);
        this.totalPatient = data.total_patient;
      }
    });
  }

  getAllBloodGroupCount(): void {
    this.adminService.get_stock().subscribe({
      next: (data: BloodStock[]) => {
        console.log(data);
        this.bloodGroupStocks = data;
      }
    });
  }
}
