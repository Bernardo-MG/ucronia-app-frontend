import { Component, EventEmitter, Output } from '@angular/core';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'order-button-template',
  templateUrl: './order-button-template.component.html',
  styleUrls: ['./order-button-template.component.sass']
})
export class OrderButtonTemplateComponent {

  @Output() ascending = new EventEmitter<void>();

  @Output() descending = new EventEmitter<void>();

  public directionIcon;

  private ascendingIcon = faSortUp;
  private descendingIcon = faSortDown;
  private defaultIcon = faSort;

  private isAscending = true;

  constructor() {
    this.directionIcon = this.defaultIcon;
  }

  public onChangeOrder() {
    // Switch icons
    if (this.isAscending) {
      // Currently it is in ascending order
      // Switching to descending order
      this.isAscending = false;

      this.directionIcon = this.descendingIcon;
      this.descending.emit();
    } else {
      // Currently it is in descending order
      // Switching to ascending order
      this.isAscending = true;

      this.directionIcon = this.ascendingIcon;
      this.ascending.emit();
    }
  }

}
