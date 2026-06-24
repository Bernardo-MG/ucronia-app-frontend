import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Activity } from '@ucronia/domain';
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

  public readonly show = output<Activity>();
  
}
