import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { IconAccountComponent, IconSettingsComponent, LogoutIconComponent } from 'icons';

@Component({
    selector: 'layout-account-dropdown',
    imports: [RouterModule, IconAccountComponent, IconSettingsComponent, LogoutIconComponent, JustifyCenterDirective],
    templateUrl: './account-dropdown.component.html'
})
export class AccountDropdownComponent implements OnInit {

  public username = '';

  constructor(
    private authContainer: AuthContainer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authContainer.getDetails().subscribe(u => { this.username = u.username });
  }

  public onLogout() {
    this.authContainer.logout();
    if (this.router.url === '/') {
      window.location.reload();
    } else {
      this.router.navigate(['/']);
    }
  }

}
