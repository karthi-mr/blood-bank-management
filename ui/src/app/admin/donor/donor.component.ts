import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Donor, DonorResult } from '../admin.model';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.scss']
})
export class DonorComponent implements OnInit{

  donors: Donor[] = [];
  nextLink: string | null = null;
  prevLink: string | null = null;
  total: number | null = null;
  totalCount: number | null = null;
  page: number = 1;
  valueCount: number = 0;
  isLoading: boolean = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
      this.loadData();
  }

  calculateTotalPage(data: number): number {
    let a = parseInt(String(data / 50));
    if(data % 50 != 0) {
      a += 1;
    }
    return a;
  }

  loadData(): void {
    this.isLoading = true;
    this.adminService.get_donor(null).subscribe({
      next: (data: DonorResult) => {
        // console.log(data);
        this.nextLink = data.links.next;
        this.prevLink = data.links.previous;
        this.donors = data.results;
        this.total = this.calculateTotalPage(data.total);
        this.totalCount = data.total;
        this.page = 1;
        this.valueCount = data.count;
        this.isLoading = false;
      }
    })
  }

  onNext(): void {
    this.isLoading = true;
    this.adminService.get_donor(this.nextLink).subscribe({
      next: (data: DonorResult) => {
        // console.log(data);
        this.nextLink = data.links.next;
        this.prevLink = data.links.previous;
        this.donors = data.results;
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
    this.adminService.get_donor(this.prevLink).subscribe({
      next: (data: DonorResult) => {
        // console.log(data);
        this.nextLink = data.links.next;
        this.prevLink = data.links.previous;
        this.donors = data.results;
        this.total = this.calculateTotalPage(data.total);
        this.totalCount = data.total;
        this.page -= 1;
        this.valueCount -= data.count;
        if (this.valueCount % 50 != 0){
          this.valueCount = (this.page - 1) * 50;
          this.isLoading = false;
        }
      }
    })
  }

  onFullPrev(): void {
    this.loadData();
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
      this.adminService.get_donor(link).subscribe({
        next: (data: DonorResult) => {
          // console.log(data);
          this.nextLink = data.links.next;
          this.prevLink = data.links.previous;
          this.donors = data.results;
          this.total = this.calculateTotalPage(data.total);
          this.totalCount = data.total;
          this.page = this.calculateTotalPage(data.total);
          this.valueCount = dCount + data.count;
          this.isLoading = false;
        }
      })
    }
}
