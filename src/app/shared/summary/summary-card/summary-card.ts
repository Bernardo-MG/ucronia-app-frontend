import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-summary-card',
  imports: [CardModule],
  templateUrl: './summary-card.html'
})
export class SummaryCard {

  public readonly label = input('');
  public readonly value = input<any>('');

}
