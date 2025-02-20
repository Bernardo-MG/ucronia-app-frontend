import { FailureResponse, FieldFailures } from '@bernardo-mg/request';
import { Observable, throwError } from 'rxjs';

export abstract class CreateComponent<Data> {

  /**
   * Loading flag.
   */
  public saving = false;

  public failures = new FieldFailures();

  constructor() { }

  public onSave(data: Data): void {
    this.saving = true;
    this.save(data).subscribe({
      next: response => {
        this.handleSaveSuccess(response);
      },
      error: error => {
        return this.handleSaveFailure(error);
      }
    });
  }

  protected handleSaveSuccess(saved: Data) {
    this.failures.clear();

    // Reactivate component
    this.saving = false;
  }

  protected handleSaveFailure(error: any): Observable<never> {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      // No failure response
      // Just remove the failures
      this.failures.clear();
    }

    // Reactivate view
    this.saving = false;

    return throwError(() => error);
  }

  protected abstract save(toSave: Data): Observable<Data>;

}
