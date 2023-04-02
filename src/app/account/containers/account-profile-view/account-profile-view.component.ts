import { Component } from '@angular/core';
import { UserStatus } from '@app/core/security/models/user-status';
import { AuthenticationContainer } from '@app/core/security/services/authentication-container.service';

@Component({
  selector: 'account-profile-view',
  templateUrl: './account-profile-view.component.html',
  styleUrls: ['./account-profile-view.component.sass']
})
export class AccountProfileViewComponent {

  public account = new UserStatus();

  constructor(
    private authenticationContainer: AuthenticationContainer
  ) {
    this.authenticationContainer.getUserStatusObservable().subscribe(u => { this.account = u });
  }

}
