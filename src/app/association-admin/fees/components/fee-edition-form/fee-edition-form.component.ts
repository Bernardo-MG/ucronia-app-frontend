import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { FormModule } from '@app/shared/form/form.module';
import { IconSuccessOrFailureComponent } from '@app/shared/icons/components/icon-success-or-failure/icon-success-or-failure.component';
import { Fee } from '../../../../models/fees/fee';

@Component({
    selector: 'assoc-fee-edition-form',
    imports: [CommonModule, FormModule, SaveControlsComponent, IconSuccessOrFailureComponent],
    templateUrl: './fee-edition-form.component.html'
})
export class FeeEditionFormComponent extends FormComponent<Fee> {

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
      person: fb.group({
        number: [null, Validators.required]
      }),
      month: ['', Validators.required],
      payment: fb.group({
        index: [null],
        date: ['', Validators.required]
      })
    });
  }

}