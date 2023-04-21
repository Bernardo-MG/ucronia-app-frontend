import { Component } from '@angular/core';
import { UserStatus } from '@app/core/authentication/models/user-status';
import { AuthenticationContainer } from '@app/core/authentication/services/authentication-container.service';

@Component({
  selector: 'account-profile-view',
  templateUrl: './account-profile-view.component.html'
})
export class AccountProfileViewComponent {

  public account = new UserStatus();

  constructor(
    private authenticationContainer: AuthenticationContainer
  ) {
    this.authenticationContainer.getUserStatusObservable().subscribe(u => { this.account = u });
  }

}
