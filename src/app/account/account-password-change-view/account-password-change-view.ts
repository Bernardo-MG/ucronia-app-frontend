import { Component, inject } from '@angular/core';
import { AccountChangePasswordForm } from '@app/account/account-change-password-form/account-change-password-form';
import { AccountService } from '@app/account/account-service';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { PasswordChange } from '@bernardo-mg/security';
import { CardModule } from 'primeng/card';
import { throwError } from 'rxjs';

@Component({
  imports: [CardModule, AccountChangePasswordForm],
  templateUrl: './account-password-change-view.html'
})
export class AccountPasswordChangeView {

  private readonly service = inject(AccountService);

  public loading = false;

  public failures = new FailureStore();

  public onChangePassword(data: PasswordChange) {
    this.loading = true;

    this.service.changePassword(data).subscribe({
      complete: () => {
        this.loading = false;
      },
      error: error => this.handleError(error)
    });
  }

  private handleError(error: unknown): void {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      this.failures.clear();
    }
  }

}
