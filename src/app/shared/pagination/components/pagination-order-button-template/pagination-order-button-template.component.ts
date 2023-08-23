import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { Direction } from '../../../../core/api/models/direction';

/**
 * Loops through unsorted -> ascending -> descending -> unsorted
 */
@Component({
  selector: 'pagination-order-button-template',
  templateUrl: './pagination-order-button-template.component.html'
})
export class PaginationOrderButtonTemplateComponent {

  private _direction = Direction.Unsorted;

  @Input() set direction(direction: Direction) {
    this._direction = direction;
    this.updateDirection();
  }

  get direction() {
    return this._direction;
  }

  @Input() disabled = false;

  @Output() directionChange = new EventEmitter<Direction>();

  private ascendingIcon = faSortUp;
  private descendingIcon = faSortDown;
  private defaultIcon = faSort;

  public directionIcon = this.defaultIcon;

  constructor() {
    this.updateDirection();
  }

  public onChangeDirection() {
    if (this.direction === Direction.Ascending) {
      this.direction = Direction.Descending;
    } else if (this.direction === Direction.Descending) {
      this.direction = Direction.Unsorted;
    } else {
      this.direction = Direction.Ascending;
    }

    this.directionChange.emit(this.direction);
    this.updateDirection();
  }

  private updateDirection() {
    switch (this.direction) {
      case Direction.Ascending:
        this.directionIcon = this.ascendingIcon;
        break;
      case Direction.Descending:
        this.directionIcon = this.descendingIcon;
        break;
      default:
        this.directionIcon = this.defaultIcon;
        break;
    }
  }
}
