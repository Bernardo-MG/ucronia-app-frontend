import { Component, OnInit } from '@angular/core';
import { FrontpageService } from '@app/frontpage/service/frontpage.service';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';

@Component({
  selector: 'app-frontpage-highlights',
  standalone: true,
  imports: [ArticleComponent, TeamupCalendarComponent],
  templateUrl: './highlights.component.html'
})
export class HighlightsComponent implements OnInit {

  constructor(
    private service: FrontpageService
  ) { }

  public calendarId = 'kspdvhz24iyp7516tn';

  ngOnInit(): void {
    this.service.getCalendarCode().subscribe({
      next: response => {
      },
      error: error => {
      }
    });
  }

}
