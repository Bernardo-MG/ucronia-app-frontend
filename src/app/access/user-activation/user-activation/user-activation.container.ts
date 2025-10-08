
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { BlockUIModule } from 'primeng/blockui';
import { CardModule } from 'primeng/card';
import { throwError } from 'rxjs';
import { UserActivate } from '../models/user-activate';
import { AccessUserActivateService } from '../user-activate-service';
import { UserActivationForm } from '../user-activation-form/user-activation-form.component';

/**
 * User activation. Activates a new user, and sets the password for it. The user is identified by a token.
 * 
 * This token is received through the route, and validated before allowing the user to do anything.
 */
@Component({
  selector: 'access-user-activation',
  imports: [CardModule, UserActivationForm, BlockUIModule],
  templateUrl: './user-activation.container.html'
})
export class UserActivation {

  private readonly service = inject(AccessUserActivateService);

  /**
   * Token validation flag. If set to true the component is waiting for the token validation to finish.
   */
  public validating = false;

  /**
   * Waiting flag. If set to true the component is waiting for the user actiation request to finish.
   */
  public waiting = false;

  /**
   * View status.
   */
  public status: 'valid_token' | 'invalid_token' | 'finished' = 'valid_token';

  /**
   * Username for the user being activated. This is taken from the token validation response.
   */
  public username = '';

  /**
   * Token for identifying the user.
   */
  private token = '';

  /**
   * Failures when activating the user.
   */
  public failures = new FailureStore();

  constructor() {
    const route = inject(ActivatedRoute);

    // Validate token from route
    route.paramMap.subscribe(params => {
      const token = params.get('token');
      if (token) {
        this.validateToken(token);
      }
    });
  }

  /**
   * Activates the user with the received password. The user will be acquired by the backend from the token.
   * 
   * @param password new password for the user
   */
  public onActivateUser(password: string): void {
    this.waiting = true;

    this.failures.clear();

    const activate = new UserActivate();
    activate.password = password;
    this.service.activateUser(this.token, activate).subscribe({
      next: response => {
        this.status = 'finished';
        this.waiting = false;
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures.clear();
        }
        this.waiting = false;

        return throwError(() => error);
      }
    });
  }

  /**
   * Validates the received token.
   * 
   * @param token token to validate
   */
  private validateToken(token: string): void {
    this.validating = true;
    this.service.validateToken(token).subscribe({
      next: response => {
        if (!response.content.valid) {
          this.status = 'invalid_token';
        } else {
          this.token = token;
          this.username = response.content.username;
        }
        this.validating = false;
      },
      error: response => {
        this.status = 'invalid_token';
        this.validating = false;
      }
    });
  }

}
