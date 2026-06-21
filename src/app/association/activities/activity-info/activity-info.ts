import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { DetailField } from '@bernardo-mg/ui';
import { Activity } from '@ucronia/domain';

@Component({
  selector: 'assoc-activity-info',
  imports: [ DetailField, DatePipe ],
  templateUrl: './activity-info.html'
})
export class ActivityInfo {

  public readonly data = input(new Activity());
  public readonly loading = input(false);

}
