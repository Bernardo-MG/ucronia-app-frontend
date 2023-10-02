import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuhtContainer } from '@app/core/authentication/services/auth.service';

@Component({
  selector: 'layout-account-dropdown',
  templateUrl: './account-dropdown.component.html'
})
export class AccountMenuComponent implements OnInit {

  public username = '';

  private loginUrl = '/login';

  constructor(
    private authContainer: AuhtContainer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authContainer.getDetails().subscribe(u => { this.username = u.username });
  }

  public onLogout() {
    this.authContainer.logout();
    this.router.navigate([this.loginUrl]);
  }

}
