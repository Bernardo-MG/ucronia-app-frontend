import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { Observable, throwError } from 'rxjs';

export abstract class InfoEditorStatusComponent<Data> {

  /**
   * Reading flag. Active while the data is being read.
   */
  protected reading = false;

  /**
   * Saving flag. Active while the data is being saved.
   */
  protected saving = false;

  /**
   * Editing flag. Active while the form is active for editing.
   */
  protected editing = false;

  /**
   * Editable flag. Active if the user has permissions to edit the data.
   */
  protected editable = false;

  /**
   * Deletable flag. Active if the user has permissions to delete the data.
   */
  protected deletable = false;

  /**
   * Failures after saving.
   */
  protected failures = new FieldFailures();

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

  public get showMenu() {
    return this.editable || this.deletable;
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

  /**
   * Cancel editing template method. Sets the component back to showing info.
   */
  public onCancel(): void {
    this.editing = false;
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
          this.onLoad(response);
          this.reading = false;
        },
        error: error => {
          this.reading = false;
        }
      });
  }

  protected onLoad(data: Data): void {
    this.data = data;
  }

  protected abstract delete(): void;

  protected abstract read(): Observable<Data>;

  protected abstract save(toSave: Data): Observable<Data>;

}
