import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { Fee } from '../../../models/fee';

@Component({
  selector: 'assoc-fee-edit-form',
  standalone: true,
  imports: [CommonModule, FormModule, ReactiveFormsModule, IconsModule, WaitingButtonComponent],
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