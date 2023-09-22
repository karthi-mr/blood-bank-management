import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit{

  message: string = "An Unknown error occurred in Logout.";
  time: number = 10;
  interval: any;
  timeout: any;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.message = "You have been logged out successfully.";
    this.authService.logout_user();

    this.interval = setInterval(() => {
      this.time--;
    }, 1000);

    this.timeout = setTimeout(() => {
      this.onClickLogin();
    }, 10000);
  }

  onClickLogin(): void {
    this.router.navigate(['/auth'], {relativeTo: this.route})
    if(this.interval) {
      clearInterval(this.interval);
    }
    if(this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}
