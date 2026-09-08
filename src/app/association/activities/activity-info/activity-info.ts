import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Activity, ActivityDate } from '@ucronia/domain';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'assoc-activity-info',
  imports: [DatePipe, TagModule],
  templateUrl: './activity-info.html'
})
export class ActivityInfo {

  public readonly data = input(new Activity());
  public readonly loading = input(false);

  public isUpcoming(date: ActivityDate): boolean {
    return new Date(date.end) >= new Date();
  }

}
