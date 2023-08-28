import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent<Data> {

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

  @Input() public failures: { [key: string]: Failure[] } = {};

  @Input() public set data(value: Data) {
    this.form.patchValue(value as any);
  }

  public get data() {
    return this.form.value;
  }

  @Output() public save = new EventEmitter<Data>();

  public form: any;

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
   * Checks if the form field is invalid.
   * 
   * @param property property to check
   * @returns true if the form is invalid, false otherwise
   */
  public isFieldInvalid(property: string): boolean {
    return this.isFormFieldInvalid(property) || (property in this.failures);
  }

  /**
   * Returns the failures for a property.
   * 
   * @param property property to search for failures
   * @returns failures for the property
   */
  public getFailures(property: string): Failure[] {
    let failures: Failure[];

    const found = this.failures[property];
    if (found) {
      failures = (found as Failure[]);
    } else {
      failures = [];
    }

    return failures;
  }

  /**
   * Returns if the save action is disabled.
   * 
   * @returns true of the save action is disabled, false otherwise
   */
  public isSaveDisabled() {
    return ((!this.form.valid) || (this.waiting) || (this.readonly));
  }

  /**
   * Checks if the form field is invalid.
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

  private toggleEnable() {
    if (this.readonly || this.waiting) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

}
