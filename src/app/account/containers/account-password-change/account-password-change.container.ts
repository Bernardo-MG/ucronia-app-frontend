import { Component } from '@angular/core';
import { AccountChangePasswordFormComponent } from '@app/account/components/password-change/account-change-password-form/account-change-password-form.component';
import { PasswordChange } from '@app/account/models/password-change';
import { AccountService } from '@app/account/services/account.service';
import { ArticleComponent, CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { FailureResponse, FieldFailures } from '@bernardo-mg/request';
import { throwError } from 'rxjs';

@Component({
    selector: 'account-password-change',
    imports: [ArticleComponent, AccountChangePasswordFormComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
    templateUrl: './account-password-change.container.html'
})
export class AccountPasswordChangeContainer {

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
          this.failures.clear();
        }
        // Reactivate view
        this.saving = false;

        return throwError(() => error);
      }
    });
  }

}
