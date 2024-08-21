import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { Fee } from '../../../models/fee';

@Component({
  selector: 'assoc-fee-edit-form',
  standalone: true,
  imports: [CommonModule, FormModule, IconsModule, SaveControlsComponent],
  templateUrl: './fee-edit-form.component.html'
})
export class FeeEditFormComponent extends FormComponent<Fee> {

  @Input() public override set data(value: Fee) {
    super.loadData(value);
    this.fee = value;
  }

  public fee = new Fee();

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      date: [null, Validators.required]
    });
  }

}