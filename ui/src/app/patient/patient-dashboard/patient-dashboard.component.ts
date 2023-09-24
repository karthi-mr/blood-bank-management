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

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
      this.getAllCount();
  }

  getAllCount(): void {
    this.adminService.get_total_request_blood().subscribe({
      next: (data: {total_request: number}) => {
        // console.log(data);
        this.totalRequest = data.total_request;
      }
    });
  }
}
