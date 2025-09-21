import { Component, inject } from '@angular/core';
import { AccountChangePasswordForm } from '@app/account/account-change-password-form/account-change-password-form';
import { PasswordChange } from '@app/account/models/password-change';
import { AccountService } from '@app/account/services/account-service';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { throwError } from 'rxjs';

@Component({
  selector: 'account-password-change',
  imports: [CardModule, AccountChangePasswordForm, ResponsiveShortColumnsDirective],
  templateUrl: './account-password-change.html'
})
export class AccountPasswordChange {

  private readonly service = inject(AccountService);

  public saving = false;

  public failures = new FailureStore();

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
          this.failures.clear();
        }
        // Reactivate view
        this.saving = false;

        return throwError(() => error);
      }
    });
  }

}
