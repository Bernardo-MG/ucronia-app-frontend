import { Component } from '@angular/core';
import { AuthenticationContainer } from '@app/security/authentication/service/authentication-container.service';
import { UserStatus } from '@app/security/login/model/user-status';

@Component({
  selector: 'account-settings-view',
  templateUrl: './account-settings-view.component.html',
  styleUrls: ['./account-settings-view.component.sass']
})
export class AccountSettingsViewComponent {

  public account = new UserStatus();

  constructor(
    private authenticationContainer: AuthenticationContainer
  ) {
    this.authenticationContainer.getUserStatusObservable().subscribe(u => { this.account = u });
  }

}
