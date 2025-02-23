import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '@app/core/authentication/models/user';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { InputFailureFeedbackComponent } from '@app/shared/form/components/input-failure-feedback/input-failure-feedback.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { InvalidFieldDirective } from '@bernardo-mg/form';

@Component({
    selector: 'access-user-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SaveControlsComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
    templateUrl: './access-user-form.component.html'
})
export class AccessUserFormComponent extends FormComponent<User> {

  @Input() public create = true;

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

}
