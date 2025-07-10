import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

/**
 * Card footer wrapper.
 */
@Component({
  selector: 'ui-card-footer',
  imports: [CommonModule, CardModule],
  templateUrl: './card-footer.component.html'
})
export class CardFooterComponent {

}
