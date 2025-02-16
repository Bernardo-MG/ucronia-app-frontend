import { Component, OnInit } from '@angular/core';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';
import { ArticleComponent } from '@bernardo-mg/layout';
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
