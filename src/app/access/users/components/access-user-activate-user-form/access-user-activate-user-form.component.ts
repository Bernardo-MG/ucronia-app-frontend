import { Component } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';

@Component({
  selector: 'access-user-activate-user-form',
  templateUrl: './access-user-activate-user-form.component.html'
})
export class AccessUserActivateUserFormComponent extends FormComponent<string> {

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();

    this.form = this.formBuilder.nonNullable.group({
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.passwordsMatch()]]
    });
  }

  private passwordsMatch(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (c.parent) {

        const password: any = c.parent.get('password');
        const confirmPassword: any = c.parent.get('confirmPassword');

        return password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
      }
      return null;
    };
  }

}
