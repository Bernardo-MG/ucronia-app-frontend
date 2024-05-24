import { Component, OnInit } from '@angular/core';
import { FrontpageService } from '@app/frontpage/services/frontpage.service';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';

@Component({
  selector: 'app-public-activity-calendar-widget',
  standalone: true,
  imports: [ArticleComponent, TeamupCalendarComponent, WaitingOverlayComponent],
  templateUrl: './public-activity-calendar-widget.component.html'
})
export class PublicActivityCalendarWidgetComponent implements OnInit {

  public readingCalendarId = false;

  constructor(
    private service: FrontpageService
  ) { }

  public calendarCode = '';

  ngOnInit(): void {
    this.readingCalendarId = true;
    this.service.getCalendarCode().subscribe({
      next: response => {
        this.calendarCode = response;
        this.readingCalendarId = false;
      },
      error: error => {
        this.readingCalendarId = false;
      }
    });
  }

}
