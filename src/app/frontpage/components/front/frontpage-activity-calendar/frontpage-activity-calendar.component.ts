import { Component, Input, OnInit } from '@angular/core';
import { FrontpageService } from '@app/frontpage/services/frontpage.service';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';

@Component({
  selector: 'frontpage-activity-calendar',
  standalone: true,
  imports: [ArticleComponent, TeamupCalendarComponent, WaitingOverlayComponent],
  templateUrl: './frontpage-activity-calendar.component.html'
})
export class FrontpageActivityCalendarWidgetComponent {

  @Input() public waiting = false;

  @Input() public calendarCode = '';

}
