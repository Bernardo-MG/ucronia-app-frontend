import { Component } from '@angular/core';
import { PasswordChange } from '@app/account/models/password-change';
import { AccountService } from '@app/account/services/account.service';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'account-password-change',
  templateUrl: './account-password-change.component.html'
})
export class AccountPasswordChangeComponent {

  public saving = false;

  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private service: AccountService
  ) { }

  public onChangePassword(data: PasswordChange) {
    this.saving = true;

    this.service.changePassword(data).subscribe({
      next: status => {
        // Succesful request

        // Reactivate form
        this.saving = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = {};
        }
        // Reactivate form
        this.saving = false;
      }
    });
  }

}
