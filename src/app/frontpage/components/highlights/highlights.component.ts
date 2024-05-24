import { Component } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';
import { PublicActivityCalendarWidgetComponent } from '../public-activity-calendar-widget/public-activity-calendar-widget.component';

@Component({
  selector: 'app-frontpage-highlights',
  standalone: true,
  imports: [ArticleComponent, TeamupCalendarComponent, WaitingOverlayComponent, PublicActivityCalendarWidgetComponent],
  templateUrl: './highlights.component.html'
})
export class HighlightsComponent {

}
