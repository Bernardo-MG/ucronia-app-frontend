import { Component, OnInit } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { ActivityCalendarService } from '../../services/activity-calendar.service';
import { ActivityCalendarWidgetComponent } from '../activity-calendar/activity-calendar.component';

@Component({
  selector: 'app-activity-calendar-frontpage',
  standalone: true,
  imports: [ArticleComponent, ActivityCalendarWidgetComponent, WaitingOverlayComponent],
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
