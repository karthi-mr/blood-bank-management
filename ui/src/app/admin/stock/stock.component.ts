import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { BloodStock } from '../admin.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BloodGroup } from 'src/app/shared/shared.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  stocks: BloodStock[] = [];
  isLoading: boolean = false;
  isEditMode: boolean = false;
  blood_group!: BloodGroup;
  blood_unit: number = 0;
  errorMessage: string | undefined;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBloodStock();
  }

  getBloodStock(): void {
    this.isEditMode = false;
    this.isLoading = true;
    this.adminService.getStockDetail().subscribe({
      next: (data: BloodStock[]) => {
        this.stocks = data;
        this.isLoading = false;
      },
    });
  }

  onAddBloodGroup(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  onClickBloodStock(stock: BloodStock): void {
    this.blood_group = stock.blood_group;
    this.blood_unit = 0;
    this.isEditMode = true;
  }

  onSubmit(formData: NgForm): void {
    this.adminService
      .updateStock({
        blood_group: this.blood_group.id,
        unit: formData.value.unit,
      })
      .subscribe({
        next: (data: any) => {
          this.getBloodStock();
          this.isEditMode = false;
          this.errorMessage = undefined;
        },
        error: (errorData: HttpErrorResponse) => {
          this.errorMessage = errorData.error.detail;
        },
      });
  }

  onCloseErrorMessage(): void {
    this.errorMessage = undefined;
  }

  onClickCancel(): void {
    this.isEditMode = false;
  }
}
