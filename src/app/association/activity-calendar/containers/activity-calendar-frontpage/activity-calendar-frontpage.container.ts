import { Component, OnInit } from '@angular/core';
import { CardModule } from '@app/shared/card/card.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { ActivityCalendarWidgetComponent } from '../../components/activity-calendar/activity-calendar.component';
import { ActivityCalendarService } from '../../services/activity-calendar.service';

@Component({
  selector: 'app-activity-calendar-frontpage',
  standalone: true,
  imports: [CardModule, ArticleComponent, ActivityCalendarWidgetComponent, BlockUiDirective],
  templateUrl: './activity-calendar-frontpage.container.html'
})
export class ActivityCalendarFrontpageContainer implements OnInit {

  public readingCalendarCode = false;

  public calendarCode = '';

  constructor(
    private service: ActivityCalendarService
  ) { }

  ngOnInit(): void {
    this.readingCalendarCode = true;
    this.service.getCalendarCode().subscribe({
      next: response => {
        this.calendarCode = response;
        this.readingCalendarCode = false;
      },
      error: error => {
        this.readingCalendarCode = false;
      }
    });
  }

}
