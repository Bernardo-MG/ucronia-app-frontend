import { Component } from '@angular/core';
import { ActivityCalendarWidgetComponent } from '@app/association/activity-calendar/components/activity-calendar-widget/activity-calendar-widget.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';

@Component({
  selector: 'app-frontpage-highlights',
  standalone: true,
  imports: [ArticleComponent, TeamupCalendarComponent, WaitingOverlayComponent, ActivityCalendarWidgetComponent],
  templateUrl: './highlights.component.html'
})
export class HighlightsComponent {

}
