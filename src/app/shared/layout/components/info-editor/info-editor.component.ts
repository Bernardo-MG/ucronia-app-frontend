import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { Observable, throwError } from 'rxjs';

export abstract class InfoEditorComponent<Data> {

  /**
   * Reading flag. Active while the data is being read.
   */
  public reading = false;

  /**
   * Saving flag. Active while the data is being saved.
   */
  public saving = false;

  /**
   * Editing flag. Active while the form is active for editing.
   */
  public editing = false;

  /**
   * Editable flag. Active if the user has permissions to edit the data.
   */
  public editable = false;

  /**
   * Deletable flag. Active if the user has permissions to delete the data.
   */
  public deletable = false;

  /**
   * Error flag. Act
   */
  public error = false;

  /**
   * Failures after saving.
   */
  public failures = new FieldFailures();

  /**
   * Edit button active flag.
   */
  public get editEnabled() {
    return (!this.error) && (!this.reading) && (this.editable) && (!this.editing);
  }

  /**
   * Delete button active flag.
   */
  public get deleteEnabled() {
    return (!this.error) && (!this.reading) && (this.deletable) && (!this.editing);
  }

  /**
   * Form enabled flag.
   */
  public get formEnabled() {
    return (this.editable) && (this.editing) && (!this.error);
  }

  /**
   * Waiting flag.
   */
  public get waiting() {
    return (this.reading) || (this.saving);
  }

  constructor(
    public data: Data
  ) { }

  /**
   * Start editing template method, changes the component status accordingly.
   */
  public onStartEditing(): void {
    this.editing = true;
  }

  /**
   * Save template method. Calls the save hook and updated the component status.
   *
   * @param toSave data to save
   */
  public onSave(toSave: Data): void {
    this.saving = true;
    this.save(toSave).subscribe({
      next: response => {
        this.data = response;

        this.failures.clear();

        // Reactivate component
        this.saving = false;
        this.editing = false;
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          // No failure response
          // Just remove the failures
          this.failures.clear();
        }

        // Reactivate component
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
