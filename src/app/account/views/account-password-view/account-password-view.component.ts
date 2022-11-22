import { Component } from '@angular/core';
import { PasswordChange } from '@app/account/models/password-change';
import { AccountService } from '@app/account/services/account.service';

@Component({
  selector: 'account-password-view',
  templateUrl: './account-password-view.component.html',
  styleUrls: ['./account-password-view.component.sass']
})
export class AccountChangePasswordViewComponent {

  /**
   * Failed update flag.
   */
  public failed = false;

  public saving = false;

  constructor(
    private service: AccountService
  ) { }

  public onChangePassword(data: PasswordChange) {
    this.saving = true;

    this.service.changePassword(data).subscribe({
      next: status => {
        // Succesful request

        // The failed flag may be set, if the user didn't log in succesfully
        this.failed = !status.successful;

        // Reactivate form
        this.saving = false;
      },
      error: error => {
        // Failed request
        this.failed = true;
        // Reactivate form
        this.saving = false;
      }
    });
  }

}
