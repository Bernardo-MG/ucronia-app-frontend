import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { AssociationConfiguration } from '../../models/association-configuration';

@Component({
  selector: 'assoc-configuration-form',
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
