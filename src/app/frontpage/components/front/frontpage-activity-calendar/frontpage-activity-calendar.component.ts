import { Component, Input } from '@angular/core';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';

@Component({
  selector: 'frontpage-activity-calendar',
  standalone: true,
  imports: [TeamupCalendarComponent],
  templateUrl: './frontpage-activity-calendar.component.html'
})
export class FrontpageActivityCalendarComponent {

  @Input() public calendarCode = '';

}
