import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ui';

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.bloodGroupList().subscribe();
  }
}
