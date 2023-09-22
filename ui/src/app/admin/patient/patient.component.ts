import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';
import { Patient, PatientResult } from '../admin.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit{

  patients: Patient[] = []
  nextLink: string | null = null;
  prevLink: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
      this.adminService.get_patient(null).subscribe({
        next: (data: PatientResult) => {
          // console.log(data);
          this.nextLink = data.links.next;
          this.prevLink = data.links.prev;
          this.patients = data.results;
        }
      })
  }

  onNext(): void {
    this.adminService.get_patient(this.nextLink).subscribe({
      next: (data: PatientResult) => {
        // console.log(data);
        this.nextLink = data.links.next;
        this.prevLink = data.links.prev;
        this.patients = data.results;
      }
    })
  }

  onPrev(): void {
    this.adminService.get_patient(this.prevLink).subscribe({
      next: (data: PatientResult) => {
        // console.log(data);
        this.nextLink = data.links.next;
        this.prevLink = data.links.prev;
        this.patients = data.results;
      }
    })
  }
}
