
import { Component, Input, inject, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { UserLogin } from '../models/user-login';

/**
 * Login form component. Dumb component for just handling the form.
 * 
 * Includes checkbox for the 'remember me' functionality.
 */
@Component({
  selector: 'login-login-form',
  imports: [FormsModule, ReactiveFormsModule, ToggleSwitchModule, InputTextModule, FloatLabelModule, ButtonModule, MessageModule],
  templateUrl: './login-form.html'
})
export class LoginForm {

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
   * Failed login flag. Shows the failure warning.
   */
  @Input() public failedLogin = false;

  /**
   * Login event. Sent when the user accepts the data in the form.
   */
  public readonly login = output<UserLogin>();

  /**
   * Remember me event. Sent when the user changes the remember me flag.
   */
  public readonly rememberMe = output<boolean>();

  /**
   * Lost password event. Sent when the user clicks on the lost password option.
   */
  public readonly lostPassword = output<void>();

  /**
   * Login enabled flag.
   */
  public get loginEnabled(): boolean {
    return ((this.form.valid) && (!this.waiting));
  }

  /**
   * Remember me enabled flag.
   */
  public get rememberMeEnabled(): boolean {
    return (!this.waiting);
  }

  /**
   * Lost password enabled flag.
   */
  public get lostPasswordEnabled(): boolean {
    return (!this.waiting);
  }

  /**
   * Form structure.
   */
  public form;

  constructor() {
    const formBuilder = inject(FormBuilder);

    this.form = formBuilder.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Handler for the login event.
   */
  public onLogin() {
    if (this.form.valid) {
      // Valid form, can send data
      const user = new UserLogin(this.form.value.username, this.form.value.password);
      this.login.emit(user);
    }
  }

  /**
   * Handler for the remember me event.
   * 
   * @param event checkbox selection param
   */
  public onRememberMe(event: any) {
    if (this.rememberMeEnabled) {
      this.rememberMe.emit(event.checked);
    }
  }

  /**
   * Handler for the lost password event.
   */
  public onLostPasword() {
    if (this.lostPasswordEnabled) {
      // TODO: The 'emit' function requires a mandatory void argument
      this.lostPassword.emit();
    }
  }

}
