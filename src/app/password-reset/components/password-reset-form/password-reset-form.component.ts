import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'login-password-reset-form',
  templateUrl: './password-reset-form.component.html'
})
export class PasswordResetFormComponent {

  @Output() public passwordReset = new EventEmitter<string>();

}
