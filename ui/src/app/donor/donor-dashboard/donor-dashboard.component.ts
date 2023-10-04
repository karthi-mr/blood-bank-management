import { Component, OnInit } from '@angular/core';
import { DonorService } from '../donor.service';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-donor-dashboard',
  templateUrl: './donor-dashboard.component.html',
  styleUrls: ['./donor-dashboard.component.scss'],
})
export class DonorDashboardComponent implements OnInit {
  title: string = 'Donor Dashboard';
  totalDonate: number = 0;
  totalDonateApproved: number = 0;
  totalDonatePending: number = 0;
  totalDonateRejected: number = 0;
  totalRequest: number = 0;
  totalRequestApproved: number = 0;
  totalRequestPending: number = 0;
  totalRequestRejected: number = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.get_total_donate_blood();
    this.get_total_donate_blood_approved();
    this.get_total_donate_blood_pending();
    this.get_total_donate_blood_rejected();
    this.get_total_request_blood();
    this.get_total_request_blood_approved();
    this.get_total_request_blood_pending();
    this.get_total_request_blood_rejected();
  }

  private get_total_donate_blood(): void {
    this.adminService.get_total_donate_blood().subscribe({
      next: (data: { total_donate: number }) => {
        this.totalDonate = data.total_donate;
      },
    });
  }

  private get_total_donate_blood_approved(): void {
    this.adminService.get_total_donate_blood_approved().subscribe({
      next: (data: { total_donate: number }) => {
        return (this.totalDonateApproved = data.total_donate);
      },
    });
  }

  private get_total_donate_blood_pending(): void {
    this.adminService.get_total_donate_blood_pending().subscribe({
      next: (data: { total_donate: number }) => {
        this.totalDonatePending = data.total_donate;
      },
    });
  }

  private get_total_donate_blood_rejected(): void {
    this.adminService.get_total_donate_blood_rejected().subscribe({
      next: (data: { total_donate: number }) => {
        this.totalDonateRejected = data.total_donate;
      },
    });
  }

  private get_total_request_blood(): void {
    this.adminService.get_total_request_blood().subscribe({
      next: (data: { total_request: number }) => {
        this.totalRequest = data.total_request;
      },
    });
  }

  private get_total_request_blood_approved(): void {
    this.adminService.get_total_request_blood_approved().subscribe({
      next: (data: { total_request: number }) => {
        this.totalRequestApproved = data.total_request;
      },
    });
  }

  private get_total_request_blood_pending(): void {
    this.adminService.get_total_request_blood_pending().subscribe({
      next: (data: { total_request: number }) => {
        this.totalRequestPending = data.total_request;
      },
    });
  }

  private get_total_request_blood_rejected(): void {
    this.adminService.get_total_request_blood_rejected().subscribe({
      next: (data: { total_request: number }) => {
        this.totalRequestRejected = data.total_request;
      },
    });
  }
}
