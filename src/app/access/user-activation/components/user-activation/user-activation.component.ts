import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { UserActivate } from '../../models/user-activate';
import { AccessUserActivateService } from '../../services/user-activate.service';

/**
 * User activation. Activates a new user, and sets the password for it. The user is identified by a token.
 * 
 * This token is received through the route, and validated before allowing the user to do anything.
 */
@Component({
  selector: 'access-user-activation',
  templateUrl: './user-activation.component.html'
})
export class UserActivationComponent implements OnInit {

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

    this.failures = new FieldFailures();

    const reset = new UserActivate();
    reset.password = password;
    this.service.activateUser(this.token, reset).subscribe({
      next: response => {
        this.status = 'finished';
        this.validating = false;
      },
      error: response => {
        // TODO: Unwrap error response automatically
        if (response.error.failures) {
          this.failures = response.error.failures;
        } else {
          this.failures = new FieldFailures();
        }
        this.validating = false;
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
