import { Component } from '@angular/core';
import { PasswordChange } from '@app/account/models/password-change';
import { AccountService } from '@app/account/services/account.service';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';

@Component({
  selector: 'account-password-change',
  templateUrl: './account-password-change.component.html'
})
export class AccountPasswordChangeComponent {

  public saving = false;

  public failures = new FieldFailures();

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
      error: (error: FailureResponse) => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = new FieldFailures();
        }
        // Reactivate form
        this.saving = false;
      }
    });
  }

}
