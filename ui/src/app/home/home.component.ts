import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  //

  readonly message1: string = 'Donate Blood. Save Life.';

  constructor(private router: Router, private route: ActivatedRoute) {}

  onClickDonate(): void {
    this.router.navigate(['auth']);
  }
}
