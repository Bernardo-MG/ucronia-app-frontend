import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { Fee } from '../../models/fee';

@Component({
  selector: 'assoc-fee-edit-form',
  templateUrl: './fee-edit-form.component.html'
})
export class FeeEditFormComponent extends FormComponent<Fee> {

  public info = new Fee();

  @Input() public override set data(value: Fee) {
    super.data = value;
    this.info = value;
  }

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      memberNumber: [null, [Validators.required, Validators.min(0)]],
      fullName: [null, Validators.required],
      date: [null, Validators.required]
    });
  }

  protected override loadData(data: Fee) {
    super.loadData(data);
    this.form.controls['memberNumber'].setValue(data.member.number);
    this.form.controls['fullName'].setValue(data.member.fullName);
  }

}