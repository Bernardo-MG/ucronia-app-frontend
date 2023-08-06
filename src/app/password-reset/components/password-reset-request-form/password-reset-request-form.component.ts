import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Failure } from '@app/core/api/models/failure';
import { PasswordResetRequest } from '@app/password-reset/models/password-reset-request';

@Component({
  selector: 'login-password-reset-request-form',
  templateUrl: './password-reset-request-form.component.html'
})
export class PasswordResetRequestFormComponent {

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

  @Input() public failures: { [key: string]: Failure[] } = {};

  @Output() public passwordReset = new EventEmitter<PasswordResetRequest>();

  /**
   * Form structure.
   */
  public form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public onResetPassword() {
    if (this.form.valid) {
      // Valid form, can send data
      const form = new PasswordResetRequest();
      if (this.form.value.email) {
        form.email = this.form.value.email;
      }

      this.passwordReset.emit(form);
    }
  }

  public isInvalid(property: string): boolean {
    return (this.form.get(property)?.invalid) || (property in this.failures);
  }

  public isAbleToSubmit() {
    return ((this.form.valid) && (!this.waiting));
  }

  public getFailures(property: string): Failure[] {
    let propertyFailures: Failure[];

    const found = this.failures[property];
    if (found) {
      propertyFailures = (found as Failure[]);
    } else {
      propertyFailures = [];
    }

    return propertyFailures;
  }

}
