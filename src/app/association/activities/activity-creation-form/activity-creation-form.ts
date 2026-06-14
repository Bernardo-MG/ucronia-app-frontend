import { Component, input, output } from '@angular/core';
import { FailureStore } from '@bernardo-mg/request';

@Component({
  selector: 'assoc-activity-creation-form',
  imports: [],
  templateUrl: './activity-creation-form.html'
})
export class ActivityCreationForm {

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());

  public readonly save = output<any>();

}
