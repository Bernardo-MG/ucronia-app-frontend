import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordChange } from '@app/account/models/password-change';

@Component({
  selector: 'account-change-password-form',
  templateUrl: './account-change-password-form.component.html',
  styleUrls: ['./account-change-password-form.component.sass']
})
export class AccountChangePasswordFormComponent {

  @Output() public changePassword = new EventEmitter<PasswordChange>();

  public form: FormGroup = this.fb.group({
    password: ['', Validators.required],
    passwordRepeat: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  public onSave() {
    this.changePassword.emit(this.form.value);
  }

  public isFormInvalid(): boolean {
    return this.form.invalid && (this.form.dirty || this.form.touched);
  }

}
