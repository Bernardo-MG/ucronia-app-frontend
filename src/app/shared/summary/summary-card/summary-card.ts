import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-summary-card',
  imports: [CardModule, SkeletonModule],
  templateUrl: './summary-card.html'
})
export class SummaryCard {

  public readonly label = input('');
  public readonly value = input<any>('');
  public readonly icon = input('');
  public readonly loading = input(false);

}
