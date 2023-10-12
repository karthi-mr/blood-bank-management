import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PatientService } from '../../patient.service';
import { PatientHistory } from '../../patient.model';
import { BloodGroup } from 'src/app/shared/shared.model';
import { AdminService } from 'src/app/admin/admin.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-request-detail-view',
  templateUrl: './request-detail-view.component.html',
  styleUrls: ['./request-detail-view.component.scss'],
})
export class RequestDetailViewComponent implements OnInit {
  //
  patientHistoryDetail!: PatientHistory;
  isPending: boolean = false;
  userType: number | undefined;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.loadData(data['id']);
    });
    this.route.fragment.subscribe((data: string | null) => {
      if (data != null || data == 'pending') {
        this.isPending = true;
      } else {
        this.isPending = false;
      }
    });
    this.userType = this.authService.userType();
  }

  loadData(id: number): void {
    this.patientService.bloodRequestHistoryDetail(id).subscribe({
      next: (data: { result: PatientHistory }) => {
        this.patientHistoryDetail = data.result;
      },
    });
  }

  onBack(): void {
    if (this.isPending) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onApproveRequest(id: number, blood_group: BloodGroup, unit: number): void {
    this.adminService
      .unitAvailableCheck({ blood_group: blood_group.id, unit: -unit })
      .subscribe({
        next: (data: { unit_available: boolean }) => {
          if (data.unit_available) {
            this.patientService
              .updateRequestStatus({ id: id, status: 1 })
              .subscribe({
                next: (data: any) => {
                  this.adminService
                    .updateStock({ blood_group: blood_group.id, unit: -unit })
                    .subscribe({
                      next: (data: any) => {},
                    });
                },
              });
          } else {
            alert('Requested stock not available.');
          }
        },
      });
  }

  onRejectRequest(id: number): void {
    this.router.navigate(['admin', 'request-blood', 'reject', id], {
      fragment: 'blood-request',
    });
  }
}
