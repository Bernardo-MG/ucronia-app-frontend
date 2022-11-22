import { Component } from '@angular/core';
import { AuthenticationContainer } from '@app/security/authentication/service/authentication-container.service';
import { UserStatus } from '@app/security/login/model/user-status';

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
