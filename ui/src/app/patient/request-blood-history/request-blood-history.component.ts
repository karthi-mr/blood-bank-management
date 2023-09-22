import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { PatientHistory } from '../patient.model';

@Component({
  selector: 'app-request-blood-history',
  templateUrl: './request-blood-history.component.html',
  styleUrls: ['./request-blood-history.component.scss']
})
export class RequestBloodHistoryComponent implements OnInit {

  requestHistory: PatientHistory[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
      this.getRequestHistory();
  }

  getRequestHistory(): void {
    this.patientService.get_blood_request_history().subscribe({
      next: (data: any) => {
        this.requestHistory = data;
      }
    })
  }
}
