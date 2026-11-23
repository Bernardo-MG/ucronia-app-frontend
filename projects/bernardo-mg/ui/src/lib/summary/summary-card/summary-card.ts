import { Component, input } from '@angular/core';
import { CardModule } from '@openng/optimus-ui/card';
import { SkeletonModule } from '@openng/optimus-ui/skeleton';

@Component({
  selector: 'ui-summary-card',
  imports: [CardModule, SkeletonModule],
  templateUrl: './summary-card.html'
})
export class SummaryCard {

  public readonly icon = input('');
  public readonly label = input('');
  public readonly loading = input(false);
  public readonly value = input<any>('');

}
