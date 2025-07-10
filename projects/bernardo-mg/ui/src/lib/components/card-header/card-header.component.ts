import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

/**
 * Card header wrapper.
 */
@Component({
  selector: 'ui-card-header',
  imports: [CommonModule, CardModule],
  templateUrl: './card-header.component.html'
})
export class CardHeaderComponent {

}
