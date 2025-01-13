import { Component, OnInit } from '@angular/core';
import { CardModule } from '@app/shared/card/card.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ActivityCalendarWidgetComponent } from '../../components/activity-calendar/activity-calendar.component';
import { ActivityCalendarService } from '../../services/activity-calendar.service';

@Component({
  selector: 'app-activity-calendar-frontpage',
  standalone: true,
  imports: [CardModule, ArticleComponent, ActivityCalendarWidgetComponent],
  templateUrl: './activity-calendar-frontpage.container.html'
})
export class ActivityCalendarFrontpageContainer implements OnInit {

  public readingCalendarCode = false;

  public calendarCode: string | undefined;

  constructor(
    private service: ActivityCalendarService
  ) { }

  public ngOnInit(): void {
    this.service.getCalendarCode().subscribe({
      next: response => {
        this.calendarCode = response;
        this.readingCalendarCode = false;
      }
    });
  }

}
