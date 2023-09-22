import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PatientService } from '../patient.service';
import { PatientHistory } from '../patient.model';
import { BloodGroup } from 'src/app/shared/shared.model';

@Component({
  selector: 'app-request-blood',
  templateUrl: './request-blood.component.html',
  styleUrls: ['./request-blood.component.scss']
})
export class RequestBloodComponent implements OnInit{

  bloodRequests: PatientHistory[] = [];
  userType: number | undefined = undefined;

  constructor(private patientService: PatientService,
              private authService: AuthService,
              private adminService: AdminService,
              private router: Router,
              private route: ActivatedRoute
             ) {}

  ngOnInit(): void {
      this.getAllBloodRequestRequests();
  }

  getAllBloodRequestRequests(): void {
    this.patientService.get_blood_request_requests().subscribe({
      next: (data: PatientHistory[]) => {
        this.bloodRequests = data;
      }
    });
    this.userType = this.authService.get_user_type();
  }

  onClickRequestBlood(): void {
    this.router.navigate(['../donate-request-add'], 
          {relativeTo: this.route})
  }

  onApproveRequest(id: number, blood_group: BloodGroup, unit: number): void {
    this.adminService.unit_available({blood_group: blood_group.id, unit: -unit}).subscribe({
      next: (data: {unit_available: boolean}) => {
        console.log(blood_group);
        console.log(unit);
        console.log(data.unit_available);
        if(data.unit_available) {
          this.patientService.update_status_donate_requests({id: id, status: 1}).subscribe({
            next: (data: any) => {
              // console.log(data);
              this.adminService.update_stock({blood_group: blood_group.id, unit: -unit}).subscribe({
                next: (data: any) => {
                  console.log(data)
                }
              })
              this.getAllBloodRequestRequests();
            }
          });   
        }
        else {
          alert("Requested stock not available.")
        }
      }
    });
  }

  onRejectRequest(id: number): void {
    this.patientService.update_status_donate_requests({id: id, status: 3}).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.getAllBloodRequestRequests();
      }
    });
  }
}
