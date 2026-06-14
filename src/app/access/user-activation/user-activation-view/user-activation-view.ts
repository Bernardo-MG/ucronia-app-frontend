
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { BlockUIModule } from 'primeng/blockui';
import { CardModule } from 'primeng/card';
import { finalize, throwError } from 'rxjs';
import { AccessUserActivateService } from '../user-activate-service';
import { UserActivationForm } from '../user-activation-form/user-activation-form.component';

/**
 * User activation. Activates a new user, and sets the password for it. The user is identified by a token.
 * 
 * This token is received through the route, and validated before allowing the user to do anything.
 */
@Component({
  imports: [CardModule, UserActivationForm, BlockUIModule],
  templateUrl: './user-activation-view.html'
})
export class UserActivationView {

  private readonly service = inject(AccessUserActivateService);

  public status: Status = {
    validating: false,
    loading: false
  };

  public step = Step.VALID_TOKEN;

  public user: { username: string, token: string } = { username: '', token: '' };

  /**
   * Failures when activating the user.
   */
  public failures = new FailureStore();

  public Step = Step;

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
   * @param password password for the user
   */
  public onActivateUser(password: string): void {
    this.status.loading = true;

    this.failures.clear();

    this.service.activateUser(this.user.token, password).subscribe({
      complete: () => {
        this.step = Step.FINISHED;
        this.status.loading = false;
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

  /**
   * Validates the received token.
   * 
   * @param token token to validate
   */
  private validateToken(token: string): void {
    this.status.validating = true;
    this.service.validateToken(token)
      .pipe(finalize(() => this.status.validating = false))
      .subscribe({
        next: response => {
          if (response.content.valid) {
            this.user.token = token;
            this.user.username = response.content.username;
          } else {
            this.step = Step.INVALID_TOKEN;
          }
        },
        error: response => {
          this.step = Step.INVALID_TOKEN;
          this.handleError(response);
        }
      });
  }

}

interface Status {
  validating: boolean;
  loading: boolean;
}

export enum Step {
  VALID_TOKEN = 'valid_token',
  INVALID_TOKEN = 'invalid_token',
  FINISHED = 'finished'
}