import { Component, OnInit } from '@angular/core';
import { DonorService } from '../donor.service';
import { DonateHistory } from '../donor.model';

@Component({
  selector: 'app-donate-blood-history',
  templateUrl: './donate-blood-history.component.html',
  styleUrls: ['./donate-blood-history.component.scss']
})
export class DonateBloodHistoryComponent implements OnInit {

  donateHistory: DonateHistory[] = []

  constructor(private donorService: DonorService) {}

  ngOnInit(): void {
      this.donorService.get_blood_donate_history().subscribe({
        next: (data: DonateHistory[]) => {
          this.donateHistory = data;
        }
      })
  }
}
