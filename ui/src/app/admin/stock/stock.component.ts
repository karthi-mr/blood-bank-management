import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { BloodStock } from '../admin.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit{

  stocks: BloodStock[] = [];
  isLoading: boolean = false;

  constructor(private adminService: AdminService,
              private router: Router,
              private route: ActivatedRoute
             ) {}

  ngOnInit(): void {
    this.getBloodStock();
  }

  getBloodStock(): void {
    this.isLoading = true;
    this.adminService.get_stock().subscribe({
      next: (data: BloodStock[]) => {
        // console.log(data);
        this.stocks = data;
        this.isLoading = false;
      }
    });
  }

  onAddBloodGroup(): void {
    this.router.navigate(['../add-blood-group'], {relativeTo: this.route});
  }
}
