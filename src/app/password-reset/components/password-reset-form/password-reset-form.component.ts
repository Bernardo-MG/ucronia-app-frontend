import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'login-password-reset-form',
  templateUrl: './password-reset-form.component.html'
})
export class PasswordResetFormComponent {

  /**
   * Waiting flag. Shows the waiting visual cue and disables the form.
   */
  private _waiting = false;

  @Input() public set waiting(flag: boolean) {
    this._waiting = flag;
    if (this._waiting) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public get waiting() {
    return this._waiting;
  }
  /**
   * Form structure.
   */
  public form = this.formBuilder.nonNullable.group({
    password: ['', Validators.required],
    confirmPassword: ['', [Validators.required, this.passwordsMatch()]]
  });

  @Output() public passwordReset = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public onResetPassword() {
    if (this.form.valid) {
      // Valid form, can send data
      this.passwordReset.emit(this.form.value.password);
    }
  }

  /**
   * Checks if the form field is invalid.
   * 
   * @param field field to check
   * @returns true if the form is invalid, false otherwise
   */
  public isInvalid(field: string): boolean {
    let invalid: boolean;

    if (this.form.invalid) {
      const formField = this.form.get(field);
      if (formField) {
        invalid = (formField?.dirty || formField?.touched) && (formField?.errors != null);
      } else {
        invalid = false;
      }
    } else {
      invalid = false;
    }

    return invalid;
  }

  public isAbleToSubmit() {
    return (this.form.valid);
  }

  private passwordsMatch(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (c.parent) {

        let password: any = c.parent.get('password');
        let confirmPassword: any = c.parent.get('confirmPassword');

        return password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
      }
      return null;
    };
  }

}

