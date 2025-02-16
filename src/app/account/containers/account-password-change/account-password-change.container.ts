import { Component } from '@angular/core';
import { AccountChangePasswordFormComponent } from '@app/account/components/password-change/account-change-password-form/account-change-password-form.component';
import { PasswordChange } from '@app/account/models/password-change';
import { AccountService } from '@app/account/services/account.service';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { ArticleComponent } from '@bernardo-mg/layout';
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
