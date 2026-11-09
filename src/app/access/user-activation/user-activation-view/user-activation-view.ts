
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { BlockUIModule } from 'primeng/blockui';
import { CardModule } from 'primeng/card';
import { catchError, distinctUntilChanged, EMPTY, finalize, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
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

  private readonly destroyRef = inject(DestroyRef);
  private readonly service = inject(AccessUserActivateService);

  /**
   * Failures when activating the user.
   */
  public failures = new FailureStore();
  public readonly status: Status = {
    validating: false,
    loading: false
  };
  public readonly Step = Step;
  public step = Step.VALID_TOKEN;
  public user: { username: string, token: string } = { username: '', token: '' };

  private readonly tokenChanged = new Subject<void>();

  public constructor() {
    const route = inject(ActivatedRoute);

    route.paramMap.pipe(
      map(params => params.get('token')),
      distinctUntilChanged(),
      switchMap(token => this.validateToken(token)),
      takeUntilDestroyed()
    ).subscribe();
  }

  // Event handlers
  private handleError(error: unknown): void {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      this.failures.clear();
    }
  }

  /**
   * Activates the user with the received password. The user will be acquired by the backend from the token.
   *
   * @param password password for the user
   */
  public onActivateUser(password: string): void {
    if (!this.user.token || this.status.validating || this.status.loading) {
      return;
    }

    this.status.loading = true;

    this.failures.clear();

    this.service.activateUser(this.user.token, password)
      .pipe(
        tap({
          complete: () => {
            this.step = Step.FINISHED;
          }
        }),
        finalize(() => this.status.loading = false),
        takeUntil(this.tokenChanged),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        error: error => this.handleError(error)
      });
  }

  // Private methods
  private validateToken(token: string | null) {
    this.tokenChanged.next();
    this.user = { username: '', token: '' };
    this.failures.clear();

    if (!token) {
      this.step = Step.INVALID_TOKEN;
      return EMPTY;
    }

    this.step = Step.VALID_TOKEN;
    this.status.validating = true;
    return this.service.validateToken(token).pipe(
      tap(response => {
        if (!response.content.valid) {
          this.step = Step.INVALID_TOKEN;
          return;
        }

        this.user = { token, username: response.content.username };
      }),
      catchError(error => {
        this.step = Step.INVALID_TOKEN;
        this.handleError(error);
        return EMPTY;
      }),
      finalize(() => this.status.validating = false)
    );
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