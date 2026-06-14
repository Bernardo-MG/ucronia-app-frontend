import { Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FailureStore } from '@bernardo-mg/request';
import { Activity, ContactMethod, FeeType } from '@ucronia/domain';

@Component({
  selector: 'assoc-activity-edition-form',
  imports: [],
  templateUrl: './activity-edition-form.html'
})
export class ActivityEditionForm {

  private readonly fb = inject(FormBuilder);

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());
  public readonly contactMethods = input<ContactMethod[]>([]);
  public readonly feeTypes = input<FeeType[]>([]);

  @Input() public set data(value: Activity) {
  }

  public readonly save = output<Activity>();

}
