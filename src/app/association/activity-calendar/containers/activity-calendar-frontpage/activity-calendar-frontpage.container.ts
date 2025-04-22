import { Component } from '@angular/core';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';
import { ArticleComponent, CardBodyComponent, CardComponent } from '@bernardo-mg/ui';
import { ActivityCalendarService } from '../../services/activity-calendar.service';

@Component({
  selector: 'app-activity-calendar-frontpage',
  imports: [ArticleComponent, TeamupCalendarComponent, CardComponent, CardBodyComponent],
  templateUrl: './activity-calendar-frontpage.container.html'
})
export class ActivityCalendarFrontpageContainer {

  public readingCalendarCode = false;

  public calendarCode: string | undefined;

  constructor(
    service: ActivityCalendarService
  ) {
    service.getCalendarCode().subscribe({
      next: response => {
        this.calendarCode = response;
        this.readingCalendarCode = false;
      }
    });
  }

}
