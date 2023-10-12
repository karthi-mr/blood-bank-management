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
  styleUrls: ['./request-blood.component.scss'],
})
export class RequestBloodComponent implements OnInit {
  bloodRequests: PatientHistory[] = [];
  userType: number | undefined = undefined;
  isLoading: boolean = false;

  constructor(
    private patientService: PatientService,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllBloodRequestRequests();
  }

  getAllBloodRequestRequests(): void {
    this.isLoading = true;
    this.patientService.bloodRequestList().subscribe({
      next: (data: PatientHistory[]) => {
        this.bloodRequests = data;
        this.isLoading = false;
      },
    });
    this.userType = this.authService.userType();
  }

  onClickRequestBlood(): void {
    this.router.navigate(['../request-blood/add'], { relativeTo: this.route });
  }

  onViewHistory(): void {
    this.router.navigate(['history'], {
      relativeTo: this.route,
    });
  }

  onViewDetail(id: number): void {
    this.router.navigate(['detail', id], {
      relativeTo: this.route,
      fragment: 'pending',
    });
  }
}
