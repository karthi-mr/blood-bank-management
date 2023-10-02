import { Component, OnInit } from '@angular/core';
import { Patient } from '../../admin.model';
import { AdminService } from '../../admin.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit{
  patient!: Patient;

  constructor(private adminService: AdminService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.loadDonorData();
  }

  private loadDonorData(): void {
    this.route.params.subscribe({
      next: (data: Params) => {
        // console.log(data);
        this.getPatientDetail(data['id']);
      }
    });
  }

  private getPatientDetail(id: number): void {
    this.adminService.get_patient_detail(id).subscribe({
      next: (data: Patient) => {
        // console.log(data);
        this.patient = data;
      }
    })
  }

  onBack(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
