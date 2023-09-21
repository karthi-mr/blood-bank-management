import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  isUserLoggedIn: boolean = false;
  tabs: any;

  constructor(private authService: AuthService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
   ) {}
   
   ngOnInit(): void {
    this.isUserLoggedIn = this.authService.auto_login();
    this.authService.isLoggedIn.subscribe({
      next: (data: boolean) => {
        this.isUserLoggedIn = data;
        console.log(data);
        this.getTabs();
      }
    })
  }

  getTabs(): void {
    this.sharedService.get_tabs().subscribe({
      next: (data: any) => {
        this.tabs = data
        console.log(this.tabs);
      }
    })
  }
  
  on_logout_user(): void {
    this.authService.logout_user();
    this.router.navigate(['/auth'], 
          {queryParams: {mode: 'login'}, relativeTo: this.route});
  }
}
    