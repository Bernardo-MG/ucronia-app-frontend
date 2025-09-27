import { AbstractControl } from "@angular/forms";

export class FormStatus {

  private _loading = false;
  private _cancellable = false;

  constructor(
    private readonly form: AbstractControl
  ) { }

  get loading() {
    return this._loading;
  }

  set loading(flag: boolean) {
    this._loading = flag;
    this.toggleEnable();
  }

  get cancellable() {
    return this._cancellable;
  }
  
  set cancellable(flag: boolean) {
    this._cancellable = flag;
  }

  get saveEnabled() {
    return this.form.valid && !this._loading;
  }

  get cancelEnabled() {
    return this._cancellable && !this._loading;
  }

  get formEnabled() {
    return !this.form.disabled;
  }
  /**
   * Indicates if the form field is invalid.
   * 
   * @param property property to check
   * @returns true if the form is invalid, false otherwise
   */
  public isFormFieldInvalid(property: string): boolean {
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
    if (this._loading) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

}
