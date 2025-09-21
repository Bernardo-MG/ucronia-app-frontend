
import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Email } from '../../models/email';
import { PasswordResetRequestForm } from '../password-reset-request-form/password-reset-request-form';
import { PasswordResetService } from '../password-reset-service';

/**
 * Password reset form component. Dumb component for just handling the form.
 */
@Component({
  selector: 'login-password-reset-request',
  imports: [CardModule, PasswordResetRequestForm],
  templateUrl: './password-reset-request.html'
})
export class PasswordResetRequest {

  private readonly service = inject(PasswordResetService);

  /**
   * Finished flag. If set to true the component is finished and allows no furter operation.
   */
  public finished = false;

  /**
   * Handles the password reset request.
   * 
   * @param resetPassword password reset data
   */
  public onPasswordResetRequest(resetPassword: Email) {
    // TODO: maybe an string is enough
    this.service.requestResetPassword(resetPassword).subscribe();
    this.finished = true;
  }

}
