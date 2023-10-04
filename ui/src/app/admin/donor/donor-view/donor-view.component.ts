import { Donor } from './../../admin.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-donor-view',
  templateUrl: './donor-view.component.html',
  styleUrls: ['./donor-view.component.scss'],
})
export class DonorViewComponent implements OnInit {
  donor!: Donor;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadDonorData();
  }

  private loadDonorData(): void {
    this.route.params.subscribe({
      next: (data: Params) => {
        this.getDonorDetail(data['id']);
      },
    });
  }

  private getDonorDetail(id: number): void {
    this.adminService.get_donor_detail(id).subscribe({
      next: (data: Donor) => {
        this.donor = data;
      },
    });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
