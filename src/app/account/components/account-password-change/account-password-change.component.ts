import { Component } from '@angular/core';
import { PasswordChange } from '@app/account/models/password-change';
import { AccountService } from '@app/account/services/account.service';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { throwError } from 'rxjs';

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
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures = new FieldFailures();
        }
        // Reactivate view
        this.saving = false;

        return throwError(() => error);
      }
    });
  }

}
