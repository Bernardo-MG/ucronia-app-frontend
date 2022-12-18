import { Component } from '@angular/core';
import { AuthenticationContainer } from '@app/security/authentication/service/authentication-container.service';
import { faCircleUser, faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'navigation-account-menu-options',
  templateUrl: './navigation-account-menu-options.component.html',
  styleUrls: ['./navigation-account-menu-options.component.sass']
})
export class NavigationAccountMenuComponent {

  public accountIcon = faCircleUser;

  public settingsIcon = faGear;

  public username = '';

  constructor(
    private authenticationContainer: AuthenticationContainer
  ) {
    this.authenticationContainer.getUserStatusObservable().subscribe(u => { this.username = u.username });
  }

}
