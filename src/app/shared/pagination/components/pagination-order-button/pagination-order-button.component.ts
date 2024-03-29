import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Sort } from '@app/core/api/models/sort';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { Direction } from '../../../../core/api/models/direction';

/**
 * Loops through unsorted -> ascending -> descending -> unsorted
 */
@Component({
  selector: 'pagination-order-button',
  templateUrl: './pagination-order-button.component.html'
})
export class PaginationOrderButtonComponent implements OnChanges {

  @Input() public property = '';

  @Input() public direction = Direction.Unsorted;

  @Input() public disabled = false;

  @Output() public directionChange = new EventEmitter<Sort>();

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

    const previousDirection = this.direction;
    this.updateDirection();

    const sort = new Sort(this.property);
    sort.direction = previousDirection;
    this.directionChange.emit(sort);
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
