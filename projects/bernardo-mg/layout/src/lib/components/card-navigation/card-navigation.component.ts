import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardTab } from '../../models/card-tab';

@Component({
  selector: 'layout-card-navigation',
  imports: [CommonModule],
  templateUrl: './card-navigation.component.html'
})
export class CardNavigationComponent {

  @Input() public active = '';

  @Input() public tabs: CardTab[] = [];

  @Output() public pickTab = new EventEmitter<string>();

}
