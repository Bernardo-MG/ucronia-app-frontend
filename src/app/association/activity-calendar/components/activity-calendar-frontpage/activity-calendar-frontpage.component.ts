import { Component } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ActivityCalendarWidgetComponent } from '../activity-calendar-widget/activity-calendar-widget.component';

@Component({
  selector: 'app-activity-calendar-frontpage',
  standalone: true,
  imports: [ArticleComponent, ActivityCalendarWidgetComponent],
  templateUrl: './activity-calendar-frontpage.component.html'
})
export class ActivityCalendarFrontpageComponent {

}
