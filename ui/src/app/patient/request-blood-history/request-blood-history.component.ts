import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { PatientHistory } from '../patient.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-blood-history',
  templateUrl: './request-blood-history.component.html',
  styleUrls: ['./request-blood-history.component.scss']
})
export class RequestBloodHistoryComponent implements OnInit {

  requestHistory: PatientHistory[] = [];

  constructor(private patientService: PatientService,
              private router: Router,
              private route: ActivatedRoute) {}

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

  onClickBack(): void {
    this.router.navigate(['../request-blood'], {relativeTo: this.route});
  }
}
