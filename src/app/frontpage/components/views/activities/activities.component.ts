import { Component } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { PublicActivityCalendarWidgetComponent } from '../../public-activity-calendar-widget/public-activity-calendar-widget.component';

@Component({
  selector: 'app-frontpage-activities',
  standalone: true,
  imports: [ArticleComponent, PublicActivityCalendarWidgetComponent],
  templateUrl: './activities.component.html'
})
export class ActivitiesComponent {

}
