import { Component, OnInit } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';
import { ActivityCalendarService } from '../../services/activity-calendar.service';

@Component({
  selector: 'assoc-activity-calendar-widget',
  standalone: true,
  imports: [ArticleComponent, TeamupCalendarComponent, WaitingWrapperComponent],
  templateUrl: './activity-calendar-widget.component.html'
})
export class ActivityCalendarWidgetComponent implements OnInit {

  public readingCalendarId = false;

  constructor(
    private service: ActivityCalendarService
  ) { }

  public calendarId = '';

  ngOnInit(): void {
    this.readingCalendarId = true;
    this.service.getCalendarCode().subscribe({
      next: response => {
        this.calendarId = response;
        this.readingCalendarId = false;
      },
      error: error => {
        this.readingCalendarId = false;
      }
    });
  }

}
