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
  errorMessage: string | null = null;

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
    this.adminService.get_stock().subscribe({
      next: (data: BloodStock[]) => {
        // console.log(data);
        this.stocks = data;
        this.isLoading = false;
      },
    });
  }

  onAddBloodGroup(): void {
    this.router.navigate(['../add-blood-group'], { relativeTo: this.route });
  }

  onClickBloodStock(stock: BloodStock): void {
    // alert(`Blood Stock with ${stock.id}, ${stock.blood_group.blood_group} Clicked...`);
    this.blood_group = stock.blood_group;
    this.blood_unit = 0;
    this.isEditMode = true;
  }

  onSubmit(formData: NgForm): void {
    this.adminService
      .update_stock({
        blood_group: this.blood_group.id,
        unit: formData.value.unit,
      })
      .subscribe({
        next: (data: any) => {
          this.getBloodStock();
          this.isEditMode = false;
        },
        error: (errorData: HttpErrorResponse) => {
          // console.log(errorData);
          // console.log(errorData.error.detail);
          this.errorMessage = errorData.error.detail;
        },
      });
  }

  onCloseErrorMessage(): void {
    this.errorMessage = null;
  }

  onClickCancel(): void {
    this.isEditMode = false;
  }
}
