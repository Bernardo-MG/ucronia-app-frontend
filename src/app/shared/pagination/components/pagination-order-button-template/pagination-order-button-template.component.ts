import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { Direction } from '../../models/direction';

/**
 * Loops through unsorted -> ascending -> descending -> unsorted
 */
@Component({
  selector: 'pagination-order-button-template',
  templateUrl: './pagination-order-button-template.component.html'
})
export class PaginationOrderButtonTemplateComponent {

  public _direction = Direction.Unsorted;

  @Input() public set direction(direction: Direction) {
    this._direction = direction;
    this.updateDirection();
  }

  public get direction() {
    return this._direction;
  }

  @Input() public disabled = false;

  @Output() public ascending = new EventEmitter<void>();

  @Output() public descending = new EventEmitter<void>();

  @Output() public unsorted = new EventEmitter<void>();

  public directionIcon;

  private ascendingIcon = faSortUp;
  private descendingIcon = faSortDown;
  private defaultIcon = faSort;

  constructor() {
    this.directionIcon = this.defaultIcon;
  }

  public onChangeOrder() {
    switch (this.direction) {
      case Direction.Ascending: {
        // Currently it is in ascending order
        // Switching to descending order
        this.direction = Direction.Descending;

        this.directionIcon = this.descendingIcon;
        this.descending.emit();
        break;
      }
      case Direction.Descending: {
        // Currently it is in descending order
        // Switching to unsorted order
        this.direction = Direction.Unsorted;

        this.directionIcon = this.defaultIcon;
        this.unsorted.emit();
        break;
      }
      default: {
        // Any other case
        // Switching to ascending order
        this.direction = Direction.Ascending;

        this.directionIcon = this.ascendingIcon;
        this.ascending.emit();
        break;
      }
    }
  }

  private updateDirection() {
    // Pick icon based on direction
    switch (this.direction) {
      case Direction.Ascending: {
        // Ascending
        this.directionIcon = this.ascendingIcon;
        break;
      }
      case Direction.Descending: {
        // Descending
        this.directionIcon = this.descendingIcon;
        break;
      }
      default: {
        // Unsorted
        this.directionIcon = this.defaultIcon;
      }
    }
  }

}
