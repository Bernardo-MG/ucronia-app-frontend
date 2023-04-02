import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterForm } from '@app/core/security/models/register-form';

@Component({
  selector: 'security-register-form',
  templateUrl: './security-register-form.component.html',
  styleUrls: ['./security-register-form.component.sass']
})
export class SecurityRegisterFormComponent {

  @Output() public register = new EventEmitter<RegisterForm>();

  public form = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public onLogin() {
    if (this.form.valid) {
      // Valid form, can send data
      const user = new RegisterForm();
      if (this.form.value.username) {
        user.username = this.form.value.username;
      }
      if (this.form.value.password) {
        user.password = this.form.value.password;
      }

      this.register.emit(user);
    }
  }

  /**
   * Checks if the form field is invalid.
   * 
   * @param field field to check
   * @returns true if the form is invalid, false otherwise
   */
  public isFieldInvalid(field: string): boolean {
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

}
