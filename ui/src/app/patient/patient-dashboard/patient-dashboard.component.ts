import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss'],
})
export class PatientDashboardComponent implements OnInit {
  title: string = 'Patient Dashboard';
  totalRequest: number = 0;
  totalRequestApproved: number = 0;
  totalRequestPending: number = 0;
  totalRequestRejected: number = 0;
  isLoading: boolean = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.get_total_request_blood();
    this.get_total_request_blood_approved();
    this.get_total_request_blood_pending();
    this.get_total_request_blood_rejected();
  }

  private get_total_request_blood(): void {
    this.isLoading = true;
    this.adminService.get_total_request_blood().subscribe({
      next: (data: { total_request: number }) => {
        this.totalRequest = data.total_request;
        this.isLoading = false;
      },
    });
  }

  private get_total_request_blood_approved(): void {
    this.isLoading = true;
    this.adminService.get_total_request_blood_approved().subscribe({
      next: (data: { total_request: number }) => {
        this.totalRequestApproved = data.total_request;
        this.isLoading = false;
      },
    });
  }

  private get_total_request_blood_pending(): void {
    this.isLoading = true;
    this.adminService.get_total_request_blood_pending().subscribe({
      next: (data: { total_request: number }) => {
        this.totalRequestPending = data.total_request;
        this.isLoading = false;
      },
    });
  }

  private get_total_request_blood_rejected(): void {
    this.isLoading = true;
    this.adminService.get_total_request_blood_rejected().subscribe({
      next: (data: { total_request: number }) => {
        this.totalRequestRejected = data.total_request;
        this.isLoading = false;
      },
    });
  }
}
