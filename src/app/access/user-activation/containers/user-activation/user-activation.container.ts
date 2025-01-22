import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { throwError } from 'rxjs';
import { UserActivationFormComponent } from '../../components/user-activation-form/user-activation-form.component';
import { UserActivate } from '../../models/user-activate';
import { AccessUserActivateService } from '../../services/user-activate.service';

/**
 * User activation. Activates a new user, and sets the password for it. The user is identified by a token.
 * 
 * This token is received through the route, and validated before allowing the user to do anything.
 */
@Component({
    selector: 'access-user-activation',
    imports: [CommonModule, UserActivationFormComponent, CardComponent, CardBodyComponent, BlockUiDirective],
    templateUrl: './user-activation.container.html'
})
export class UserActivationContainer implements OnInit {

  /**
   * Token validation flag. If set to true the component is waiting for the token validation to finish.
   */
  public validating = false;

  /**
   * User activation flag. If set to true the component is waiting for the user actiation request to finish.
   */
  public activating = false;

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
  public failures = new FieldFailures();

  constructor(
    private route: ActivatedRoute,
    private service: AccessUserActivateService
  ) { }

  public ngOnInit(): void {
    // Validate token from route
    this.route.paramMap.subscribe(params => {
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
    this.validating = true;

    this.failures.clear();

    const reset = new UserActivate();
    reset.password = password;
    this.service.activateUser(this.token, reset).subscribe({
      next: response => {
        this.status = 'finished';
        this.validating = false;
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures.clear();
        }
        // Reactivate view
        this.validating = false;

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
