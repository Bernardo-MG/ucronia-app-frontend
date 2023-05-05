import { Component } from '@angular/core';
import { SecurityStatus } from '@app/core/authentication/models/security-status';
import { SecurityContainer } from '@app/core/authentication/services/security-container.service';

@Component({
  selector: 'account-profile-view',
  templateUrl: './account-profile-view.component.html'
})
export class AccountProfileViewComponent {

  public account = new SecurityStatus();

  constructor(
    private securityContainer: SecurityContainer
  ) {
    this.securityContainer.getStatusObservable().subscribe(u => { this.account = u });
  }

}
