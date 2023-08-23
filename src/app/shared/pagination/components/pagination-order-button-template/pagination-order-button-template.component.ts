import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { Direction } from '../../../../core/api/models/direction';

/**
 * Loops through unsorted -> ascending -> descending -> unsorted
 */
@Component({
  selector: 'pagination-order-button-template',
  templateUrl: './pagination-order-button-template.component.html'
})
export class PaginationOrderButtonTemplateComponent implements OnChanges {

  @Input() public direction = Direction.Unsorted;

  @Input() public disabled = false;

  @Output() public directionChange = new EventEmitter<Direction>();

  private ascendingIcon = faSortUp;
  private descendingIcon = faSortDown;
  private defaultIcon = faSort;

  public directionIcon = this.defaultIcon;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['direction']) {
      this.updateDirection();
    }
  }

  public onChangeDirection() {
    if (this.direction === Direction.Ascending) {
      // Ascending -> descending
      this.direction = Direction.Descending;
    } else if (this.direction === Direction.Descending) {
      // Descending -> unsorted
      this.direction = Direction.Unsorted;
    } else {
      // Unsorted -> ascending
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
