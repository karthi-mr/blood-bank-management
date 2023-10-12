import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { DonateHistory } from '../donor.model';
import { DonorService } from './../donor.service';

@Component({
  selector: 'app-donate-blood',
  templateUrl: './donate-blood.component.html',
  styleUrls: ['./donate-blood.component.scss'],
})
export class DonateBloodComponent implements OnInit {
  donateRequests: DonateHistory[] = [];
  userType: number | undefined = undefined;
  isLoading: boolean = false;

  constructor(
    private donorService: DonorService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllBloodDonateRequests();
  }

  getAllBloodDonateRequests(): void {
    this.isLoading = true;
    this.donorService.donateBloodRequest().subscribe({
      next: (data: DonateHistory[]) => {
        this.donateRequests = data;
        this.isLoading = false;
      },
    });
    this.userType = this.authService.get_user_type();
  }

  onClickDonateBlood(): void {
    this.router.navigate(['../donate-blood/add'], { relativeTo: this.route });
  }

  onViewHistory(): void {
    this.router.navigate(['history'], { relativeTo: this.route });
  }

  onViewDetail(id: number): void {
    this.router.navigate(['detail', id], {
      relativeTo: this.route,
      fragment: 'pending',
    });
  }
}
