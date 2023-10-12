import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  message: string = 'An Unknown error occurred in Logout.';
  time: number = 5;
  interval: any;
  timeout: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.message = 'You have been logged out successfully.';
    this.authService.logoutUser();

    this.interval = setInterval(() => {
      this.time--;
    }, 1000);

    this.timeout = setTimeout(() => {
      this.onClickLogin();
    }, 5000);
  }

  onClickLogin(): void {
    this.router.navigate(['']);
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}
