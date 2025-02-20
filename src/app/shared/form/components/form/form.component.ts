import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FieldFailures } from '@bernardo-mg/request';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html'
})
export class FormComponent<Data> {

  /**
   * Allows cancelling flag.
   */
  @Input() cancellable = false;

  /**
   * Read only flag. Disables the inputs.
   */
  public _readonly = false;

  @Input() public set readonly(flag: boolean) {
    this._readonly = flag;
    this.toggleEnable();
  }

  public get readonly() {
    return this._readonly;
  }

  /**
   * Waiting flag. Shows the waiting visual cue and disables the form.
   */
  private _waiting = false;

  @Input() public set waiting(flag: boolean) {
    this._waiting = flag;
    this.toggleEnable();
  }

  public get waiting() {
    return this._waiting;
  }

  @Input() public failures = new FieldFailures();

  @Input() public set data(value: Data) {
    this.loadData(value);
  }

  public get data(): Data | undefined {
    return this.form.value;
  }

  @Output() public save = new EventEmitter<Data>();

  @Output() public reject = new EventEmitter<void>();

  public form: any;

  /**
   * Indicates if the save action is enabled.
   * 
   * @returns true if the save action is enabled, false otherwise
   */
  public get saveEnabled() {
    return (this.form.valid) && (!this.waiting) && (!this.readonly);
  }

  /**
   * Indicates if the cancel action is enabled.
   * 
   * @returns true if the cancel action is enabled, false otherwise
   */
  public get cancelEnabled() {
    return (this.cancellable) && (!this.waiting) && (!this.readonly);
  }

  /**
   * Indicates if the form is enabled.
   * 
   * @returns true if the form is enabled, false otherwise
   */
  public get formEnabled() {
    return !this.form.disabled;
  }

  /**
   * Handler for the save event.
   */
  public onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit(this.form.value);
    }
  }

  /**
   * Handler for the cancel event.
   */
  public onCancel() {
    this.reject.emit();
  }

  /**
   * Indicates if the form field is invalid.
   * 
   * @param property property to check
   * @returns true if the form is invalid, false otherwise
   */
  public isFieldInvalid(property: string): boolean {
    return this.isFormFieldInvalid(property) || (this.failures.hasFailures(property));
  }

  /**
   * Loads the received data into the form.
   *
   * @param data data to load
   */
  protected loadData(data: Data) {
    this.form.patchValue(data as any);
  }

  /**
   * Indicates if the form field is invalid.
   * 
   * @param property property to check
   * @returns true if the form is invalid, false otherwise
   */
  private isFormFieldInvalid(property: string): boolean {
    let invalid: boolean;

    if (this.form.invalid) {
      // Form invalid
      // So this field may be invalid

      const formField = this.form.get(property);
      if (formField) {
        // Check the field status
        invalid = (formField?.dirty || formField?.touched) && (formField?.errors != null);
      } else {
        // Invalid property
        // Can't be invalid
        invalid = false;
      }
    } else {
      // Form valid
      // No field is invalid
      invalid = false;
    }

    return invalid;
  }

  /**
   * Toggles the form enabled status, based on the status flags.
   */
  private toggleEnable() {
    if (this.readonly || this.waiting) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

}
