import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardBodyComponent, CardComponent } from '@bernardo-mg/ui';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
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

  private readonly service = inject(PasswordResetService);

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
  public failures = new FailureStore();

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
