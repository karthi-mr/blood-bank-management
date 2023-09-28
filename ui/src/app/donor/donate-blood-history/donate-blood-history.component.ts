import { Component, OnInit } from '@angular/core';
import { DonorService } from '../donor.service';
import { DonateHistory, DonateHistoryView } from '../donor.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-donate-blood-history',
  templateUrl: './donate-blood-history.component.html',
  styleUrls: ['./donate-blood-history.component.scss']
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

  constructor(private donorService: DonorService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getBloodDonateHistory();
  }

  calculateTotalPage(data: number): number {
    let a = parseInt(String(data / 50));
    if(data % 50 != 0) {
      a += 1;
    }
    return a;
  }

  getBloodDonateHistory(): void {
    this.isLoading = true;
    this.donorService.get_blood_donate_history(null).subscribe({
      next: (data: DonateHistoryView) => {
        this.nextLink = data.links.next;
        this.prevLink = data.links.previous;
        this.donateHistory = data.results;
        this.total = this.calculateTotalPage(data.total);
        this.totalCount = data.total;
        this.page = 1;
        this.valueCount = data.count;
        this.isLoading = false;
      }
    });
  }

  onNext(): void {
    this.isLoading = true;
    this.donorService.get_blood_donate_history(this.nextLink).subscribe({
      next: (data: DonateHistoryView) => {
        // console.log(data);
        this.nextLink = data.links.next;
        this.prevLink = data.links.previous;
        this.donateHistory = data.results;
        this.total = this.calculateTotalPage(data.total);
        this.totalCount = data.total;
        this.page += 1;
        this.valueCount += data.count;
        this.isLoading = false;
      }
    })
  }

  onPrev(): void {
    this.isLoading = true;
    this.donorService.get_blood_donate_history(this.prevLink).subscribe({
      next: (data: DonateHistoryView) => {
        // console.log(data);
        this.nextLink = data.links.next;
        this.prevLink = data.links.previous;
        this.donateHistory = data.results;
        this.total = this.calculateTotalPage(data.total);
        this.totalCount = data.total;
        this.page -= 1;
        this.valueCount -= data.count;
        if (this.valueCount % 50 != 0){
          this.valueCount = (this.page - 1) * 50;
        }
        this.isLoading = false;
      }
    })
  }

  onFullPrev(): void {
    this.getBloodDonateHistory();
  }

  onFullNext(): void {
    this.isLoading = true;
    // console.log(this.count);
    const count = 50;
    // console.log(this.totalCount);
    let dataCount = 0, dCount = 0;
    if(this.totalCount){
      dataCount = (this.totalCount % count);
    }
    if(dataCount > 0 && this.totalCount) {
       dCount = this.totalCount - dataCount;
    }
    else {
      if (this.totalCount)
        dCount = this.totalCount - 50;
    }
      // const link = 
      //     `http://127.0.0.1:8000/auth/donor/?limit=50&offset=${this.totalCount - dataCount}`;
      const link = 
          `http://127.0.0.1:8000/auth/donor/?limit=50&offset=${dCount}`;
      // console.log(link);
      this.donorService.get_blood_donate_history(link).subscribe({
        next: (data: DonateHistoryView) => {
          // console.log(data);
          this.nextLink = data.links.next;
          this.prevLink = data.links.previous;
          this.donateHistory = data.results;
          this.total = this.calculateTotalPage(data.total);
          this.totalCount = data.total;
          this.page = this.calculateTotalPage(data.total);
          this.valueCount = dCount + data.count;
          this.isLoading = false;
        }
      })
    }

  onClickBack(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
