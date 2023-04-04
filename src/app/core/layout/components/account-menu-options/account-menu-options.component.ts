import { Component } from '@angular/core';
import { AuthenticationContainer } from '@app/core/authentication/services/authentication-container.service';

@Component({
  selector: 'layout-account-menu-options',
  templateUrl: './account-menu-options.component.html',
  styleUrls: ['./account-menu-options.component.sass']
})
export class AccountMenuComponent {

  public username = '';

  constructor(
    private authenticationContainer: AuthenticationContainer
  ) {
    this.authenticationContainer.getUserStatusObservable().subscribe(u => { this.username = u.username });
  }

}
