import { Component, EventEmitter, Output } from '@angular/core';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'order-button',
  templateUrl: './order-button-template.component.html',
  styleUrls: ['./order-button-template.component.sass']
})
export class OrderButtonTemplateComponent {

  @Output() ascending = new EventEmitter<void>();

  @Output() descending = new EventEmitter<void>();

  public currentDirectionIcon;
  public alternativeDirectionIcon;

  private currentEvent;
  private alternativeEvent;

  private ascendingIcon = faSortUp;
  private descendingIcon = faSortDown;

  constructor() {
    this.currentDirectionIcon = this.ascendingIcon;
    this.alternativeDirectionIcon = this.descendingIcon;

    this.currentEvent = this.ascending;
    this.alternativeEvent = this.descending;
  }

  public switchDirection() {
    // Switch icons
    const tempIcon = this.currentDirectionIcon;
    this.currentDirectionIcon = this.alternativeDirectionIcon;
    this.alternativeDirectionIcon = tempIcon;

    // Switch events
    const tempEvent = this.currentEvent;
    this.currentEvent = this.alternativeEvent;
    this.alternativeEvent = tempEvent;

    this.currentEvent.emit();
  }

}
