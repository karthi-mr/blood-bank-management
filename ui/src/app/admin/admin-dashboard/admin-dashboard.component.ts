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
    this.adminService.get_total_donor().subscribe({
      next: (data: {total_donor: number}) => {
        // console.log(data);
        this.totalDonor = data.total_donor;
      }
    });
  }

  private getAllPatientCount(): void {
    this.adminService.get_total_patient().subscribe({
      next: (data: {total_patient: number}) => {
        // console.log(data);
        this.totalPatient = data.total_patient;
      }
    });
  }
  

  private getAllBloodGroupCount(): void {
    this.adminService.get_stock().subscribe({
      next: (data: BloodStock[]) => {
        // console.log(data);
        this.bloodGroupStocks = data;
      }
    });
  }

  private get_total_donate_blood(): void {
    this.adminService.get_total_donate_blood().subscribe({
      next: (data: {total_donate: number}) => {
        // console.log(data);
        this.totalDonate = data.total_donate;
      }
    });
  }

  private get_total_donate_blood_approved(): void {
    this.adminService.get_total_donate_blood_approved().subscribe({
      next: (data: {total_donate: number}) => {
        // console.log(data);
        return this.totalDonateApproved = data.total_donate;
      }
    });
  }

  private get_total_donate_blood_pending(): void {
    this.adminService.get_total_donate_blood_pending().subscribe({
      next: (data: {total_donate: number}) => {
        // console.log(data);
        this.totalDonatePending = data.total_donate;
      }
    });
  }

  private get_total_donate_blood_rejected(): void {
    this.adminService.get_total_donate_blood_rejected().subscribe({
      next: (data: {total_donate: number}) => {
        // console.log(data);
        this.totalDonateRejected = data.total_donate;
      }
    });
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
