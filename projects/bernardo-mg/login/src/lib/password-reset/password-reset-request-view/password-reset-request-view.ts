
import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PasswordResetRequestForm } from '../password-reset-request-form/password-reset-request-form';
import { PasswordResetService } from '../password-reset-service';

/**
 * Password reset form component. Dumb component for just handling the form.
 */
@Component({
  selector: 'login-password-reset-request-view',
  imports: [CardModule, PasswordResetRequestForm],
  templateUrl: './password-reset-request-view.html'
})
export class PasswordResetRequestView {

  private readonly service = inject(PasswordResetService);

  /**
   * Finished flag. If set to true the component is finished and allows no furter operation.
   */
  public finished = false;

  /**
   * Handles the password reset request.
   * 
   * @param password new password
   */
  public onPasswordResetRequest(password: string) {
    // TODO: maybe an string is enough
    this.service.requestResetPassword(password).subscribe();
    this.finished = true;
  }

}
