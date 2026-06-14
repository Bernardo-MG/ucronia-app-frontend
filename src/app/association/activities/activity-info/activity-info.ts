import { Component, input } from '@angular/core';
import { Activity } from '@ucronia/domain';

@Component({
  selector: 'assoc-activity-info',
  imports: [],
  templateUrl: './activity-info.html'
})
export class ActivityInfo {

  public readonly data = input(new Activity());
  public readonly loading = input(false);

}
