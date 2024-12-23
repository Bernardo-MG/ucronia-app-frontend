import { Component, Input } from '@angular/core';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';

@Component({
  selector: 'frontpage-calendar',
  standalone: true,
  imports: [TeamupCalendarComponent],
  templateUrl: './frontpage-calendar.component.html'
})
export class FrontpageCalendarComponent {

  @Input() public calendarCode = '';

}
