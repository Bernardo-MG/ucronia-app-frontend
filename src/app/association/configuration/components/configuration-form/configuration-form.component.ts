import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { AssociationConfiguration } from '../../models/association-configuration';

@Component({
  selector: 'assoc-configuration-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, WaitingButtonComponent],
  templateUrl: './configuration-form.component.html'
})
export class ConfigurationFormComponent extends FormComponent<AssociationConfiguration> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      feeAmount: [0, Validators.required]
    });
  }

}
