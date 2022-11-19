import { Component } from '@angular/core';
import { AuthenticationContainer } from '@app/security/authentication/service/authentication-container.service';
import { faCircleUser, faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'account-nav-menu',
  templateUrl: './account-nav-menu.component.html',
  styleUrls: ['./account-nav-menu.component.sass']
})
export class AccountNavMenuComponent {

  public accountIcon = faCircleUser;

  public settingsIcon = faGear;

  public username = '';

  constructor(
    private authenticationContainer: AuthenticationContainer
  ) {
    this.authenticationContainer.getUserStatusObservable().subscribe(u => { this.username = u.username });
  }

}
