import { Component, OnInit } from '@angular/core';
import { DonateHistory } from '../../donor.model';
import { DonorService } from '../../donor.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BloodGroup } from 'src/app/shared/shared.model';
import { AdminService } from 'src/app/admin/admin.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-donate-detail-view',
  templateUrl: './donate-detail-view.component.html',
  styleUrls: ['./donate-detail-view.component.scss'],
})
export class DonateDetailViewComponent implements OnInit {
  donorHistoryDetail!: DonateHistory;
  isPending: boolean = false;
  id!: number;
  userType: number | undefined;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private donorService: DonorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.loadData(data['id']);
    });
    this.route.fragment.subscribe((data: string | null) => {
      if (data != null || data == 'pending') {
        this.isPending = true;
      } else {
        this.isPending = false;
      }
    });
    this.userType = this.authService.get_user_type();
  }

  loadData(id: number): void {
    this.donorService.get_blood_donate_history_detail(id).subscribe({
      next: (data: { result: DonateHistory }) => {
        this.donorHistoryDetail = data.result;
      },
    });
  }

  onBack(): void {
    if (this.isPending) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onApproveRequest(id: number, blood_group: BloodGroup, unit: number): void {
    this.donorService
      .update_status_donate_requests({ id: id, status: 1 })
      .subscribe({
        next: (data: any) => {
          this.adminService
            .updateStock({ blood_group: blood_group.id, unit: unit })
            .subscribe({
              next: (data: any) => {
                this.router.navigate(['admin', 'donate-blood']);
              },
            });
          // this.getAllBloodDonateRequests();
        },
      });
  }

  onRejectRequest(id: number): void {
    this.router.navigate(['admin', 'donate-blood', 'reject', id], {
      fragment: 'blood-donate',
    });
  }
}
