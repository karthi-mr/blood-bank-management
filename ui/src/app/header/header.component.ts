import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  username: string | undefined = undefined;
  tabs: any = [];

  private URL_PATH = 'http://127.0.0.1:4200/home';

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTabs(false);
    this.username = this.authService.get_profile_name();
    this.isUserLoggedIn = this.authService.auto_login();
    this.authService.isLoggedIn.subscribe({
      next: (data: boolean) => {
        this.username = this.authService.get_profile_name();
        this.isUserLoggedIn = data;
        this.getTabs(true);
      },
    });
  }

  getTabs(activate: boolean): void {
    this.sharedService.get_tabs().subscribe({
      next: (data: any) => {
        this.tabs = data;
        if (this.isUserLoggedIn && activate) {
          this.router.navigate([this.tabs[0].link], { relativeTo: this.route });
        }
        if (this.isUserLoggedIn && window.location.href == this.URL_PATH) {
          this.router.navigate([this.tabs[0].link], { relativeTo: this.route });
        }
      },
    });
  }

  on_logout_user(): void {
    this.router.navigate(['/logout']);
  }
}
