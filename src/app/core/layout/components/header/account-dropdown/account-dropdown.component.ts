import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { IconAccountComponent } from '@app/shared/icons/components/icon-account/icon-account.component';
import { LogoutIconComponent } from '@app/shared/icons/components/icon-logout/icon-logout.component';
import { IconSettingsComponent } from '@app/shared/icons/components/icon-settings/icon-settings.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

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
