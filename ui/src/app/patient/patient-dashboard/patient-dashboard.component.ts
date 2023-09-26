import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit{
  
  title: string = "Patient Dashboard";
  totalRequest: number = 0;
  totalRequestApproved: number = 0;
  totalRequestPending: number = 0;
  totalRequestRejected: number = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.get_total_request_blood();
    this.get_total_request_blood_approved();
    this.get_total_request_blood_pending();
    this.get_total_request_blood_rejected();
  }

  private get_total_request_blood(): void {
    this.adminService.get_total_request_blood().subscribe({
      next: (data: {total_request: number}) => {
        // console.log(data);
        this.totalRequest = data.total_request;
      }
    });
  }

  private get_total_request_blood_approved(): void {
    this.adminService.get_total_request_blood_approved().subscribe({
      next: (data: {total_request: number}) => {
        // console.log(data);
        this.totalRequestApproved = data.total_request;
      }
    });
  }

  private get_total_request_blood_pending(): void {
    this.adminService.get_total_request_blood_pending().subscribe({
      next: (data: {total_request: number}) => {
        // console.log(data);
        this.totalRequestPending = data.total_request;
      }
    });
  }

  private get_total_request_blood_rejected(): void {
    this.adminService.get_total_request_blood_rejected().subscribe({
      next: (data: {total_request: number}) => {
        // console.log(data);
        this.totalRequestRejected = data.total_request;
      }
    });
  }
}
