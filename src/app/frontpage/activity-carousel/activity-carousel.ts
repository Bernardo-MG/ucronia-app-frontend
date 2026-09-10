import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { Activity, ActivityDate } from '@ucronia/domain';
import { CarouselModule } from 'primeng/carousel';
import { PopoverModule } from 'primeng/popover';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-activity-carousel',
  imports: [CarouselModule, PopoverModule, SkeletonModule, DatePipe, NgTemplateOutlet],
  templateUrl: './activity-carousel.html'
})
export class ActivityCarousel {

  public readonly loading = input(false);
  public readonly data = input<Activity[]>([]);

  public readonly responsiveOptions = [
    { breakpoint: '1280px', numVisible: 2, numScroll: 1 },
    { breakpoint: '768px', numVisible: 1, numScroll: 1 }
  ];

  public dateRange(activity: Activity): ActivityDate | undefined {
    const dates = this.sortedDates(activity);

    if (!dates.length) {
      return undefined;
    }

    return {
      start: dates[0].start,
      end: dates.reduce(
        (latest, date) => new Date(date.end).getTime() > new Date(latest).getTime() ? date.end : latest,
        dates[0].end
      )
    };
  }

  public sortedDates(activity: Activity): ActivityDate[] {
    return [...(activity.dates ?? [])]
      .sort((first, second) => new Date(first.start).getTime() - new Date(second.start).getTime());
  }

}
