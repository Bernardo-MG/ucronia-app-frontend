import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Activity, ActivityDate } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'assoc-activity-carousel',
  imports: [CarouselModule, CardModule, ButtonModule, DatePipe],
  templateUrl: './activity-carousel.html'
})
export class ActivityCarousel {

  public readonly loading = input(false);
  public readonly data = input<Activity[]>([]);

  public readonly expanded = new Set<number>();

  public toggleDates(activity: Activity): void {
    if (this.expanded.has(activity.number)) {
      this.expanded.delete(activity.number);
    } else {
      this.expanded.add(activity.number);
    }
  }

  public isExpanded(activity: Activity): boolean {
    return this.expanded.has(activity.number);
  }

  public firstDate(activity: Activity): ActivityDate | undefined {
    return activity.dates?.[0];
  }

  public lastDate(activity: Activity): ActivityDate | undefined {
    return activity.dates?.[activity.dates.length - 1];
  }

}
