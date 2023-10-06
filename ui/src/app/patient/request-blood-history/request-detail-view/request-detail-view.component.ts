import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PatientService } from '../../patient.service';
import { PatientHistory } from '../../patient.model';

@Component({
  selector: 'app-request-detail-view',
  templateUrl: './request-detail-view.component.html',
  styleUrls: ['./request-detail-view.component.scss'],
})
export class RequestDetailViewComponent implements OnInit {
  //

  patientHistoryDetail!: PatientHistory;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.loadData(data['id']);
    });
  }

  loadData(id: number): void {
    this.patientService.get_blood_request_history_detail(id).subscribe({
      next: (data: { result: PatientHistory }) => {
        this.patientHistoryDetail = data.result;
      },
    });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
