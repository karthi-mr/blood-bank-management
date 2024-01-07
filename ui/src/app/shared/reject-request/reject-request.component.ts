import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DonorService } from 'src/app/donor/donor.service';
import { PatientService } from 'src/app/patient/patient.service';

@Component({
  selector: 'app-reject-request',
  templateUrl: './reject-request.component.html',
  styleUrls: ['./reject-request.component.scss'],
})
export class RejectRequestComponent implements OnInit {
  reason!: string;
  type!: string;
  id!: number;
  errorMessage: string | undefined;

  constructor(
    private donorService: DonorService,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((data: any) => {
      this.type = data;
    });
    this.route.params.subscribe((data: any) => {
      this.id = data['id'];
    });
  }

  onRejectRequest(): void {
    if (this.type == 'blood-request') {
      // update status
      this.patientService
        .updateRequestStatus({ id: this.id, status: 3 })
        .subscribe({
          next: (data: any) => {
            // update reason
            this.patientService
              .updateRequestRejectReason({
                id: this.id,
                reject_reason: this.reason,
              })
              .subscribe({
                next: (data: any) => {
                  this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: (errorRes: HttpErrorResponse) => {
                  this.errorMessage = errorRes.message;
                },
              });
          },
        });
    } else if (this.type == 'blood-donate') {
      // update status
      this.donorService.updateStatus({ id: this.id, status: 3 }).subscribe({
        next: (data: any) => {
          // update reason
          this.donorService
            .updateRejectReason({
              id: this.id,
              reject_reason: this.reason,
            })
            .subscribe({
              next: (data: any) => {
                this.router.navigate(['../../'], { relativeTo: this.route });
              },
              error: (errorRes: HttpErrorResponse) => {
                this.errorMessage = errorRes.message;
              },
            });
        },
      });
    }
  }

  onCloseError(): void {
    this.errorMessage = undefined;
  }
}
