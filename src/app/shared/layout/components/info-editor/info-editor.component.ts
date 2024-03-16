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
   * Failures after saving.
   */
  public failures = new FieldFailures();

  /**
   * Edit button active flag.
   */
  public get editEnabled() {
    return (this.editable) && (!this.reading) && (!this.editing);
  }

  /**
   * Delete button active flag.
   */
  public get deleteEnabled() {
    return (this.deletable) && (!this.reading) && (!this.editing);
  }

  /**
   * Form enabled flag.
   */
  public get formEnabled() {
    return (this.editable) && (this.editing);
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
        this.interceptSave(response);
      },
      error: error => {
        this.interceptError(error);
      }
    });
  }

  public onDelete(): void {
    this.delete();
  }

  protected interceptSave(response: Data) {
    this.data = response;

    this.failures.clear();

    // Reactivate component
    this.saving = false;
    this.editing = false;
  }

  protected interceptError(error: any) {
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

  protected load(): void {
    this.reading = true;
    this.read()
      .subscribe({
        next: response => {
          this.data = response;
          this.reading = false;
        },
        error: error => {
          this.reading = false;
        }
      });
  }

  protected abstract delete(): void;

  protected abstract read(): Observable<Data>;

  protected abstract save(toSave: Data): Observable<Data>;

}
