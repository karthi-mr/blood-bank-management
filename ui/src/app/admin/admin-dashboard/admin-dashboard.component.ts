import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { BloodGroup } from 'src/app/shared/shared.model';
import { BloodStock } from '../admin.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  title: string = 'Admin Dashboard';
  totalDonor: number = 0;
  totalPatient: number = 0;
  bloodGroupStocks: BloodStock[] = [];
  totalDonate: number = 0;
  totalDonateApproved: number = 0;
  totalDonatePending: number = 0;
  totalDonateRejected: number = 0;
  totalRequest: number = 0;
  totalRequestApproved: number = 0;
  totalRequestPending: number = 0;
  totalRequestRejected: number = 0;

  isLoading: boolean = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllBloodGroupCount();
    this.getAllDonorCount();
    this.getAllPatientCount();
    this.get_total_donate_blood();
    this.get_total_donate_blood_approved();
    this.get_total_donate_blood_pending();
    this.get_total_donate_blood_rejected();
    this.get_total_request_blood();
    this.get_total_request_blood_approved();
    this.get_total_request_blood_pending();
    this.get_total_request_blood_rejected();
  }

  private getAllDonorCount(): void {
    this.isLoading = true;
    this.adminService.get_total_donor().subscribe({
      next: (data: { total_donor: number }) => {
        this.totalDonor = data.total_donor;
        this.isLoading = false;
      },
    });
  }

  private getAllPatientCount(): void {
    this.isLoading = true;
    this.adminService.get_total_patient().subscribe({
      next: (data: { total_patient: number }) => {
        this.totalPatient = data.total_patient;
        this.isLoading = false;
      },
    });
  }

  private getAllBloodGroupCount(): void {
    this.isLoading = true;
    this.adminService.get_stock().subscribe({
      next: (data: BloodStock[]) => {
        this.bloodGroupStocks = data;
        this.isLoading = false;
      },
    });
  }

  private get_total_donate_blood(): void {
    this.isLoading = true;
    this.adminService.get_total_donate_blood().subscribe({
      next: (data: { total_donate: number }) => {
        this.totalDonate = data.total_donate;
        this.isLoading = false;
      },
    });
  }

  private get_total_donate_blood_approved(): void {
    this.isLoading = true;
    this.adminService.get_total_donate_blood_approved().subscribe({
      next: (data: { total_donate: number }) => {
        this.totalDonateApproved = data.total_donate;
        this.isLoading = false;
      },
    });
  }

  private get_total_donate_blood_pending(): void {
    this.isLoading = true;
    this.adminService.get_total_donate_blood_pending().subscribe({
      next: (data: { total_donate: number }) => {
        this.totalDonatePending = data.total_donate;
        this.isLoading = false;
      },
    });
  }

  private get_total_donate_blood_rejected(): void {
    this.isLoading = true;
    this.adminService.get_total_donate_blood_rejected().subscribe({
      next: (data: { total_donate: number }) => {
        this.totalDonateRejected = data.total_donate;
        this.isLoading = false;
      },
    });
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
