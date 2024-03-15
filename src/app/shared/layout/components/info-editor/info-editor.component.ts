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

  /**
   * Edit button is active flag.
   */
  public get editEnabled() {
    return (!this.error) && (!this.reading) && this.editable && !this.editing;
  }

  /**
   * Delete button is active flag.
   */
  public get deleteEnabled() {
    return (!this.error) && (!this.reading) && this.deletable && (!this.editing);
  }

  public get allowEdit() {
    return this.editable && this.editing && (!this.error);
  }

  public get waiting() {
    return this.reading || this.saving;
  }

  constructor(
    public data: Data
  ) { }

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

  public onDelete(): void {
    this.delete();
  }

  protected load(): void {
    this.reading = true;
    this.read()
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

  protected abstract delete(): void;

  protected abstract read(): Observable<Data>;

  protected abstract save(toSave: Data): Observable<Data>;

}
