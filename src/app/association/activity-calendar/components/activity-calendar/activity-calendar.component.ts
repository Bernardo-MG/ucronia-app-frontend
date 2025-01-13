import { Component, Input } from '@angular/core';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';

@Component({
  selector: 'assoc-activity-calendar',
  standalone: true,
  imports: [TeamupCalendarComponent],
  templateUrl: './activity-calendar.component.html'
})
export class ActivityCalendarWidgetComponent {

  @Input() public calendarCode: string | undefined;

}
