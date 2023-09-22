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

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
      this.adminService.get_donor(null).subscribe({
        next: (data: DonorResult) => {
          // console.log(data);
          this.nextLink = data.links.next;
          this.prevLink = data.links.prev;
          this.donors = data.results;
        }
      })
  }

  onNext(): void {
    this.adminService.get_patient(this.nextLink).subscribe({
      next: (data: DonorResult) => {
        // console.log(data);
        this.nextLink = data.links.next;
        this.prevLink = data.links.prev;
        this.donors = data.results;
      }
    })
  }

  onPrev(): void {
    this.adminService.get_patient(this.prevLink).subscribe({
      next: (data: DonorResult) => {
        // console.log(data);
        this.nextLink = data.links.next;
        this.prevLink = data.links.prev;
        this.donors = data.results;
      }
    })
  }
}
