import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { throwError } from 'rxjs';
import { PasswordResetRequestFormComponent } from '../../components/password-reset-request-form/password-reset-request-form.component';
import { PasswordResetRequest } from '../../models/password-reset-request';
import { PasswordResetService } from '../../services/password-reset.service';

/**
 * Password reset form component. Dumb component for just handling the form.
 */
@Component({
    selector: 'login-password-reset-request',
    imports: [CommonModule, PasswordResetRequestFormComponent, CardComponent, CardBodyComponent],
    templateUrl: './password-reset-request.container.html'
})
export class PasswordResetRequestContainer {

  /**
   * Finished flag. If set to true the component is finished and allows no furter operation.
   */
  public finished = false;

  /**
   * Password reset flag. If set to true the component is waiting for the password change request to finish.
   */
  public reseting = false;

  /**
   * Failures when reseting the password.
   */
  public failures = new FieldFailures();

  constructor(
    private service: PasswordResetService
  ) { }

  /**
   * Handles the password reset request.
   * 
   * @param resetPassword password reset data
   */
  public onPasswordResetRequest(resetPassword: PasswordResetRequest) {
    this.reseting = true;
    this.failures.clear();
    this.service.requestResetPassword(resetPassword)
      .subscribe({
        next: response => {
          this.finished = true;
          this.reseting = false;
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
          this.reseting = false;

          return throwError(() => error);
        }
      });
  }

}
