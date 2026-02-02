import { Component, Input, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

/**
 * Login form component. Dumb component for just handling the form.
 * 
 * Includes checkbox for the 'remember me' functionality.
 */
@Component({
  selector: 'login-form',
  imports: [FormsModule, ReactiveFormsModule, ToggleSwitchModule, InputTextModule, FloatLabelModule, ButtonModule, MessageModule, IconFieldModule, InputIconModule],
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
  public readonly login = output<Login>();

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
   * Form structure.
   */
  public form: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.nonNullable.group({
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
      const login = new Login(this.form.value.username, this.form.value.password);
      this.login.emit(login);
    }
  }

  /**
   * Handler for the remember me event.
   * 
   * @param checked remember me flag
   */
  public onRememberMe(checked: boolean) {
    if (!this.waiting) {
      this.rememberMe.emit(checked);
    }
  }

  /**
   * Handler for the lost password event.
   */
  public onLostPasword() {
    if (!this.waiting) {
      // TODO: The 'emit' function requires a mandatory void argument
      this.lostPassword.emit();
    }
  }

}

export class Login {
  constructor(
    public username: string,
    public password: string
  ) { }
}
