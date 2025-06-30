import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

/**
 * Card wrapper.
 */
@Component({
  selector: 'ui-card',
  imports: [CardModule],
  templateUrl: './card.component.html'
})
export class CardComponent {

}
