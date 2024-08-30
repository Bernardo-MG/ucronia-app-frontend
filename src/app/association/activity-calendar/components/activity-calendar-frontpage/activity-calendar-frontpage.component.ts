import { Component, OnInit } from '@angular/core';
import { CardModule } from '@app/shared/card/card.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { ActivityCalendarService } from '../../services/activity-calendar.service';
import { ActivityCalendarWidgetComponent } from '../activity-calendar/activity-calendar.component';

@Component({
  selector: 'app-activity-calendar-frontpage',
  standalone: true,
  imports: [CardModule, ArticleComponent, ActivityCalendarWidgetComponent, BlockUiDirective],
  templateUrl: './activity-calendar-frontpage.component.html'
})
export class ActivityCalendarFrontpageComponent implements OnInit {

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
