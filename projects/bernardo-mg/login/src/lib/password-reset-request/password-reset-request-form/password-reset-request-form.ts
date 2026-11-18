import { FormStatus } from '@bernardo-mg/form';

import { Component, Input, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

/**
 * Password reset request form component. Dumb component for just handling the form.
 */
@Component({
  selector: 'login-password-reset-request-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './password-reset-request-form.html'
})
export class PasswordResetRequestForm {

  @Input()
  public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly save = output<string>();

  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  public constructor() {
    const formBuilder = inject(FormBuilder);

    this.form = formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.formStatus = new FormStatus(this.form);
  }

  // Event handlers
  /**
   * Handler for the save event.
   */
  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      // Valid form, can emit data
      this.save.emit(this.form.value.email);
    }
  }

  // Protected methods
  protected isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property);
  }

}
