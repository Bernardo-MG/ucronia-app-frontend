import { Component } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { TeamupCalendarComponent } from '../teamup-calendar/teamup-calendar.component';

@Component({
  selector: 'app-frontpage-highlights',
  standalone: true,
  imports: [ArticleComponent, TeamupCalendarComponent],
  templateUrl: './highlights.component.html'
})
export class HighlightsComponent {

  public calendarId = 'kspdvhz24iyp7516tn';

}
