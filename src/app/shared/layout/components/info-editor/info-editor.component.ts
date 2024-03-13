import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { Observable, throwError } from 'rxjs';

export abstract class InfoEditorComponent<Data> {

  /**
   * Reading flag.
   */
  public reading = false;

  /**
   * Saving flag.
   */
  public saving = false;

  public editing = false;

  public editable = false;

  public deletable = false;

  public error = false;

  public failures = new FieldFailures();

  constructor(
    public data: Data
  ) {}

  public onStartEditing(): void {
    this.editing = true;
  }

  public onSave(toSave: Data): void {
    this.saving = true;
    this.save(toSave).subscribe({
      next: d => {
        this.data = d;

        this.failures.clear();
        // Reactivate view
        this.saving = false;
        this.editing = false;
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures.clear();
        }
        // Reactivate view
        this.saving = false;

        return throwError(() => error);
      }
    });
  }

  protected load(id: string | null): void {
    if (id) {
      this.reading = true;
      this.read(id)
        .subscribe({
          next: d => {
            this.data = d;
            this.reading = false;
          },
          error: error => {
            this.reading = false;
            this.error = true;
          }
        });
    }
  }

  public isAbleToEdit() {
    return (!this.error) && (!this.reading) && this.editable && !this.editing;
  }

  public isAbleToDelete() {
    return (!this.error) && (!this.reading) && this.deletable && (!this.editing);
  }

  public isEditable() {
    return this.editable && this.editing && (!this.error);
  }

  public isWaiting() {
    return this.reading || this.saving;
  }

  protected abstract save(toSave: Data): Observable<Data>;

  protected abstract read(id: string): Observable<Data>;

}
