import { Component } from '@angular/core';
import { PasswordChange } from '@app/account/models/password-change';
import { AccountService } from '@app/account/services/account.service';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { throwError } from 'rxjs';
import { AccountChangePasswordFormComponent } from '../../password-change/account-change-password-form/account-change-password-form.component';

@Component({
  selector: 'account-password-change',
  standalone: true,
  imports: [ArticleComponent, AccountChangePasswordFormComponent],
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
          this.failures.clear();
        }
        // Reactivate view
        this.saving = false;

        return throwError(() => error);
      }
    });
  }

}
