import { AuditInfo } from '@app/shared/audit/audit-info/audit-info';
import { DatePipe } from '@angular/common';
import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Activity, ActivityDate } from '@ucronia/domain';
import { TagModule } from '@openng/optimus-ui/tag';

@Component({
  selector: 'assoc-activity-info',
  imports: [AuditInfo, DatePipe, TagModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './activity-info.html'
})
export class ActivityInfo {

  public readonly data = input(new Activity());
  public readonly loading = input(false);

  // Protected methods
  protected isUpcoming(date: ActivityDate): boolean {
    return new Date(date.end) >= new Date();
  }

}
