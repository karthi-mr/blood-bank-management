import { Component, OnInit } from '@angular/core';
import { Admin } from '../../admin.model';
import { AdminService } from '../../admin.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent implements OnInit {
  admin!: Admin;

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
        this.getAdminDetail(data['id']);
      },
    });
  }

  private getAdminDetail(id: number): void {
    this.adminService.get_admin_detail(id).subscribe({
      next: (data: Admin) => {
        this.admin = data;
      },
    });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
