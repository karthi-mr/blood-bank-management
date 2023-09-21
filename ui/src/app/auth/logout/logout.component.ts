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

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.message = "You have been logged out successfully.";
    this.authService.logout_user();
  }

  onClickLogin(): void {
    this.router.navigate(['/auth'], {relativeTo: this.route})
  }
}
