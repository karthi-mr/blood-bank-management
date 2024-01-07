import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin, AdminResult } from '../admin.model';
import { AdminService } from '../admin.service';
import { SharedService } from 'src/app/shared/shared.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  admins: Admin[] = [];
  nextLink: string | null = null;
  prevLink: string | null = null;
  total: number | null = null;
  totalCount: number | null = null;
  page: number = 1;
  valueCount: number = 0;
  isLoading: boolean = false;
  sortOrder: string = 'username';
  isFilterEnabled: boolean = false;
  // input
  inputUsername: string = '';
  inputEmail: string = '';
  inputMobile: string = '';
  // error message
  errorMessage: string | undefined;

  constructor(
    private adminService: AdminService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadData('ordering=username');
  }

  loadData(order: string): void {
    this.sortOrder = order;
    this.isLoading = true;
    this.adminService.getAdminList(null, order).subscribe({
      next: (data: AdminResult) => {
        this.nextLink = data.links.next;
        this.prevLink = data.links.previous;
        this.admins = data.results;
        this.total = this.sharedService.calculateTotalPage(data.total);
        this.totalCount = data.total;
        this.page = 1;
        this.valueCount = data.count;
        this.isLoading = false;
      },
      error: (errorRes: HttpErrorResponse) => {
        this.errorMessage = errorRes.message;
        this.isLoading = false;
      },
    });
  }

  onNext(): void {
    this.isLoading = true;
    this.adminService.getAdminList(this.nextLink, null).subscribe({
      next: (data: AdminResult) => {
        this.nextLink = data.links.next;
        this.prevLink = data.links.previous;
        this.admins = data.results;
        this.total = this.sharedService.calculateTotalPage(data.total);
        this.totalCount = data.total;
        this.page += 1;
        this.valueCount += data.count;
        this.isLoading = false;
      },
      error: (errorRes: HttpErrorResponse) => {
        this.errorMessage = errorRes.message;
        this.isLoading = false;
      },
    });
  }

  onPrev(): void {
    this.isLoading = true;
    this.adminService.getAdminList(this.prevLink, null).subscribe({
      next: (data: AdminResult) => {
        this.nextLink = data.links.next;
        this.prevLink = data.links.previous;
        this.admins = data.results;
        this.total = this.sharedService.calculateTotalPage(data.total);
        this.totalCount = data.total;
        this.page -= 1;
        this.valueCount -= data.count;
        if (this.valueCount % 50 != 0) {
          this.valueCount = (this.page - 1) * 50;
        }
        this.isLoading = false;
      },
      error: (errorRes: HttpErrorResponse) => {
        this.errorMessage = errorRes.message;
        this.isLoading = false;
      },
    });
  }

  onFullPrev(): void {
    this.loadData('ordering=username');
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
    this.adminService.getAdminList(link, null).subscribe({
      next: (data: AdminResult) => {
        this.nextLink = data.links.next;
        this.prevLink = data.links.previous;
        this.admins = data.results;
        this.total = this.sharedService.calculateTotalPage(data.total);
        this.totalCount = data.total;
        this.page = this.sharedService.calculateTotalPage(data.total);
        this.valueCount = dCount + data.count;
        this.isLoading = false;
      },
      error: (errorRes: HttpErrorResponse) => {
        this.errorMessage = errorRes.message;
        this.isLoading = false;
      },
    });
  }

  onViewAdmin(id: number): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  onEnableFilter(): void {
    this.isFilterEnabled = !this.isFilterEnabled;
    if (!this.isFilterEnabled) {
      this.loadData('ordering=username');
      this.inputUsername = '';
      this.inputEmail = '';
      this.inputMobile = '';
    }
  }

  onClickSearch(): void {
    let order = 'ordering=username';
    if (this.inputUsername) {
      order += `&username=${this.inputUsername}`;
    }
    if (this.inputEmail) {
      order += `&email=${this.inputEmail}`;
    }
    if (this.inputMobile) {
      order += `&mobile=${this.inputMobile}`;
    }
    this.loadData(order);
  }

  onClickCreate(): void {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  onClickReload(): void {
    this.errorMessage = undefined;
    this.loadData('ordering=username');
  }
}
