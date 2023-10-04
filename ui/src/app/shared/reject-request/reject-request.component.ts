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

  constructor(
    private donorService: DonorService,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((data: any) => {
      // console.log(data);
      this.type = data;
    });
    this.route.params.subscribe((data: any) => {
      // console.log(data);
      this.id = data['id'];
    });
  }

  onRejectRequest(): void {
    // alert(this.reason);
    // alert(this.type);
    // alert(this.id);

    if (this.type == 'blood-request') {
      // update status
      this.patientService
        .update_status_donate_requests({ id: this.id, status: 3 })
        .subscribe({
          next: (data: any) => {
            // update reason
            this.patientService
              .update_reject_reason_requests({
                id: this.id,
                reject_reason: this.reason,
              })
              .subscribe({
                next: (data: any) => {
                  this.router.navigate(['../../'], { relativeTo: this.route });
                },
              });
          },
        });
    } else if (this.type == 'blood-donate') {
      // update status
      this.donorService
        .update_status_donate_requests({ id: this.id, status: 3 })
        .subscribe({
          next: (data: any) => {
            // update reason
            this.donorService
              .update_reject_reason_requests({
                id: this.id,
                reject_reason: this.reason,
              })
              .subscribe({
                next: (data: any) => {
                  this.router.navigate(['../../'], { relativeTo: this.route });
                },
              });
          },
        });
    }
  }
}
