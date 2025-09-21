
import { Component, inject } from '@angular/core';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';
import { CardModule } from 'primeng/card';
import { ActivityCalendarService } from '../activity-calendar-service';

@Component({
  selector: 'app-activity-calendar',
  imports: [CardModule, TeamupCalendarComponent],
  templateUrl: './activity-calendar.html'
})
export class ActivityCalendar {

  public readingCalendarCode = false;

  public calendarCode: string | undefined;

  constructor() {
    const service = inject(ActivityCalendarService);

    service.getCalendarCode().subscribe({
      next: response => {
        this.calendarCode = response;
        this.readingCalendarCode = false;
      }
    });
  }

}
