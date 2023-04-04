import { Component } from '@angular/core';
import { AuthenticationContainer } from '@app/core/authentication/services/authentication-container.service';
import { faCircleUser, faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'layout-account-menu-options',
  templateUrl: './account-menu-options.component.html',
  styleUrls: ['./account-menu-options.component.sass']
})
export class AccountMenuComponent {

  public accountIcon = faCircleUser;

  public settingsIcon = faGear;

  public username = '';

  constructor(
    private authenticationContainer: AuthenticationContainer
  ) {
    this.authenticationContainer.getUserStatusObservable().subscribe(u => { this.username = u.username });
  }

}
