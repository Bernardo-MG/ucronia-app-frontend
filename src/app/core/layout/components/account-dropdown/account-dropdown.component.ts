import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/authentication/services/auth.service';

@Component({
  selector: 'layout-account-dropdown',
  templateUrl: './account-dropdown.component.html'
})
export class AccountMenuComponent implements OnInit {

  public username = '';

  private loginUrl = '/login';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getStatus().subscribe(u => { this.username = u.username });
  }

  public onLogout() {
    this.authService.logout();
    this.router.navigate([this.loginUrl]);
  }

}
