import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { Activity, ActivityDate } from '@ucronia/domain';
import { CarouselModule } from 'primeng/carousel';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-activity-carousel',
  imports: [CarouselModule, SkeletonModule, DatePipe, NgTemplateOutlet],
  templateUrl: './activity-carousel.html'
})
export class ActivityCarousel {

  public readonly loading = input(false);
  public readonly data = input<Activity[]>([]);

  public readonly responsiveOptions = [
    { breakpoint: '1024px', numVisible: 1, numScroll: 1 }
  ];

  public firstDate(activity: Activity): ActivityDate | undefined {
    return [...(activity.dates ?? [])]
      .sort((first, second) => new Date(first.start).getTime() - new Date(second.start).getTime())[0];
  }

}
