
import { Component, inject, OnInit } from '@angular/core';
import { TeamupCalendar } from '../../../../../projects/bernardo-mg/ui/src/lib/social/teamup-calendar/teamup-calendar';
import { CardModule } from 'primeng/card';
import { ActivityCalendarService } from '../activity-calendar-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-activity-calendar',
  imports: [CardModule, TeamupCalendar],
  templateUrl: './activity-calendar.html'
})
export class ActivityCalendar implements OnInit {

  private readonly service = inject(ActivityCalendarService);

  public readingCalendarCode = false;

  public calendarCode: string | undefined;

  public ngOnInit(): void {
    this.service.getCalendarCode()
      .pipe(finalize(() => this.readingCalendarCode = false))
      .subscribe(response => this.calendarCode = response);
  }

}
