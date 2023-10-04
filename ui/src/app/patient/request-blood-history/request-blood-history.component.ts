import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { BloodRequestHistoryView, PatientHistory } from '../patient.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-blood-history',
  templateUrl: './request-blood-history.component.html',
  styleUrls: [
    './request-blood-history.component.scss',
    '../../app.component.scss',
  ],
})
export class RequestBloodHistoryComponent implements OnInit {
  requestHistory: PatientHistory[] = [];
  nextLink: string | null = null;
  prevLink: string | null = null;
  total: number | null = null;
  totalCount: number | null = null;
  page: number = 1;
  valueCount: number = 0;
  isLoading: boolean = false;
  sortOrder: string = 'patient_name';
  isFilterEnabled: boolean = false;

  // input
  inputName: string = '';
  inputAge: string = '';
  inputReason: string = '';
  inputUnit: string = '';
  inputBloodGroup: string = '';

  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRequestHistory('ordering=patient_name');
  }

  calculateTotalPage(data: number): number {
    let a = parseInt(String(data / 50));
    if (data % 50 != 0) {
      a += 1;
    }
    return a;
  }

  getRequestHistory(order: string): void {
    this.sortOrder = order;
    this.isLoading = true;
    this.patientService.get_blood_request_history(null, order).subscribe({
      next: (data: BloodRequestHistoryView) => {
        this.nextLink = data.links.next;
        this.prevLink = data.links.previous;
        this.requestHistory = data.results;
        this.total = this.calculateTotalPage(data.total);
        this.totalCount = data.total;
        this.page = 1;
        this.valueCount = data.count;
        this.isLoading = false;
      },
    });
  }

  onNext(): void {
    this.isLoading = true;
    this.patientService
      .get_blood_request_history(this.nextLink, null)
      .subscribe({
        next: (data: BloodRequestHistoryView) => {
          this.nextLink = data.links.next;
          this.prevLink = data.links.previous;
          this.requestHistory = data.results;
          this.total = this.calculateTotalPage(data.total);
          this.totalCount = data.total;
          this.page += 1;
          this.valueCount += data.count;
          this.isLoading = false;
        },
      });
  }

  onPrev(): void {
    this.isLoading = true;
    this.patientService
      .get_blood_request_history(this.prevLink, null)
      .subscribe({
        next: (data: BloodRequestHistoryView) => {
          this.nextLink = data.links.next;
          this.prevLink = data.links.previous;
          this.requestHistory = data.results;
          this.total = this.calculateTotalPage(data.total);
          this.totalCount = data.total;
          this.page -= 1;
          this.valueCount -= data.count;
          if (this.valueCount % 50 != 0) {
            this.valueCount = (this.page - 1) * 50;
          }
          this.isLoading = false;
        },
      });
  }

  onFullPrev(): void {
    this.getRequestHistory('ordering=patient_name');
  }

  onFullNext(): void {
    this.isLoading = true;
    const count = 50;
    let dataCount = 0,
      dCount = 0;
    if (this.totalCount) {
      dataCount = this.totalCount % count;
    }
    if (dataCount > 0 && this.totalCount) {
      dCount = this.totalCount - dataCount;
    } else {
      if (this.totalCount) dCount = this.totalCount - 50;
    }
    const link = `http://127.0.0.1:8000/auth/donor/?limit=50&offset=${dCount}`;
    this.patientService.get_blood_request_history(link, null).subscribe({
      next: (data: BloodRequestHistoryView) => {
        this.nextLink = data.links.next;
        this.prevLink = data.links.previous;
        this.requestHistory = data.results;
        this.total = this.calculateTotalPage(data.total);
        this.totalCount = data.total;
        this.page = this.calculateTotalPage(data.total);
        this.valueCount = dCount + data.count;
        this.isLoading = false;
      },
    });
  }

  onClickBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onEnableFilter(): void {
    this.isFilterEnabled = !this.isFilterEnabled;
    if (!this.isFilterEnabled) {
      this.getRequestHistory('ordering=username');
      this.inputName = '';
      this.inputAge = '';
      this.inputReason = '';
      this.inputUnit = '';
      this.inputBloodGroup = '';
    }
  }

  testInput(): void {
    let order = 'ordering=donor';
    if (this.inputName) {
      order += `&name=${this.inputName}`;
    }
    if (this.inputReason) {
      order += `&reason=${this.inputReason}`;
    }
    if (this.inputAge) {
      order += `&age=${this.inputAge}`;
    }
    if (this.inputUnit) {
      order += `&unit=${this.inputUnit}`;
    }
    if (this.inputBloodGroup) {
      order += `&blood_group=${this.inputBloodGroup}`;
    }
    this.getRequestHistory(order);
  }
}
