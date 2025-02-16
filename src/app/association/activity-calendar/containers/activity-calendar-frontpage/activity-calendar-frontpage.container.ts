import { Component, OnInit } from '@angular/core';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';
import { ArticleComponent, CardBodyComponent, CardComponent } from '@bernardo-mg/layout';
import { ActivityCalendarService } from '../../services/activity-calendar.service';

@Component({
    selector: 'app-activity-calendar-frontpage',
    imports: [ArticleComponent, TeamupCalendarComponent, CardComponent, CardBodyComponent],
    templateUrl: './activity-calendar-frontpage.container.html'
})
export class ActivityCalendarFrontpageContainer implements OnInit {

  public readingCalendarCode = false;

  public calendarCode: string | undefined;

  constructor(
    private service: ActivityCalendarService
  ) { }

  public ngOnInit(): void {
    this.service.getCalendarCode().subscribe({
      next: response => {
        this.calendarCode = response;
        this.readingCalendarCode = false;
      }
    });
  }

}
