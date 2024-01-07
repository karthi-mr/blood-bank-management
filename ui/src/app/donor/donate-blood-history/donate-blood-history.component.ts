import { Component, OnInit } from '@angular/core';
import { DonorService } from '../donor.service';
import { DonateHistory, DonateHistoryView } from '../donor.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-donate-blood-history',
  templateUrl: './donate-blood-history.component.html',
  styleUrls: [
    './donate-blood-history.component.scss',
    '../../app.component.scss',
  ],
})
export class DonateBloodHistoryComponent implements OnInit {
  donateHistory: DonateHistory[] = [];
  nextLink: string | null = null;
  prevLink: string | null = null;
  total: number | null = null;
  totalCount: number | null = null;
  page: number = 1;
  valueCount: number = 0;
  isLoading: boolean = false;
  sortOrder: string = 'donor';
  isFilterEnabled: boolean = false;

  // input
  inputDonor: string = '';
  inputAge: string = '';
  inputUnit: string = '';
  inputDisease: string = '';
  inputBloodGroup: string = '';

  constructor(
    private donorService: DonorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBloodDonateHistory('ordering=-added');
  }

  calculateTotalPage(data: number): number {
    let a = parseInt(String(data / 50));
    if (data % 50 != 0) {
      a += 1;
    }
    return a;
  }

  getBloodDonateHistory(order: string): void {
    this.sortOrder = order;
    this.isLoading = true;
    this.donorService.donateBloodHistory(null, order).subscribe({
      next: (data: DonateHistoryView) => {
        this.nextLink = data.links.next;
        this.prevLink = data.links.previous;
        this.donateHistory = data.results;
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
    this.donorService.donateBloodHistory(this.nextLink, null).subscribe({
      next: (data: DonateHistoryView) => {
        this.nextLink = data.links.next;
        this.prevLink = data.links.previous;
        this.donateHistory = data.results;
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
    this.donorService.donateBloodHistory(this.prevLink, null).subscribe({
      next: (data: DonateHistoryView) => {
        this.nextLink = data.links.next;
        this.prevLink = data.links.previous;
        this.donateHistory = data.results;
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
    this.getBloodDonateHistory('ordering=-added');
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
    this.donorService.donateBloodHistory(link, null).subscribe({
      next: (data: DonateHistoryView) => {
        this.nextLink = data.links.next;
        this.prevLink = data.links.previous;
        this.donateHistory = data.results;
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
      this.getBloodDonateHistory('ordering=-added');
      this.inputDonor = '';
      this.inputAge = '';
      this.inputDisease = '';
      this.inputUnit = '';
      this.inputBloodGroup = '';
    }
  }

  testInput(): void {
    let order = 'ordering=-added';
    if (this.inputDonor) {
      order += `&donor=${this.inputDonor}`;
    }
    if (this.inputDisease) {
      order += `&disease=${this.inputDisease}`;
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
    this.getBloodDonateHistory(order);
  }

  onViewDetail(id: number): void {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
