
import { Component, inject, OnInit } from '@angular/core';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';
import { CardModule } from 'primeng/card';
import { ActivityCalendarService } from '../activity-calendar-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-activity-calendar',
  imports: [CardModule, TeamupCalendarComponent],
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
