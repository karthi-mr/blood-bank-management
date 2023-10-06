import { Component, OnInit } from '@angular/core';
import { DonateHistory } from '../../donor.model';
import { DonorService } from '../../donor.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-donate-detail-view',
  templateUrl: './donate-detail-view.component.html',
  styleUrls: ['./donate-detail-view.component.scss'],
})
export class DonateDetailViewComponent implements OnInit {
  donorHistoryDetail!: DonateHistory;

  constructor(
    private donorService: DonorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.loadData(data['id']);
    });
  }

  loadData(id: number): void {
    this.donorService.get_blood_donate_history_detail(id).subscribe({
      next: (data: { result: DonateHistory }) => {
        this.donorHistoryDetail = data.result;
      },
    });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
