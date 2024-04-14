import { Component, OnInit } from '@angular/core';
import { FrontpageService } from '@app/frontpage/service/frontpage.service';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';

@Component({
  selector: 'app-frontpage-highlights',
  standalone: true,
  imports: [ArticleComponent, TeamupCalendarComponent, WaitingWrapperComponent],
  templateUrl: './highlights.component.html'
})
export class HighlightsComponent implements OnInit {

  public readingCalendarId = false;

  constructor(
    private service: FrontpageService
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
