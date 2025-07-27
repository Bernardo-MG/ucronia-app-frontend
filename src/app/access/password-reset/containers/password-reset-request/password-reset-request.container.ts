import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PasswordResetRequestFormComponent } from '../../components/password-reset-request-form/password-reset-request-form.component';
import { PasswordResetRequest } from '../../models/password-reset-request';
import { PasswordResetService } from '../../services/password-reset.service';

/**
 * Password reset form component. Dumb component for just handling the form.
 */
@Component({
  selector: 'login-password-reset-request',
  imports: [CommonModule, CardModule, PasswordResetRequestFormComponent],
  templateUrl: './password-reset-request.container.html'
})
export class PasswordResetRequestContainer {

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
  public onPasswordResetRequest(resetPassword: PasswordResetRequest) {
    this.service.requestResetPassword(resetPassword).subscribe();
    this.finished = true;
  }

}
