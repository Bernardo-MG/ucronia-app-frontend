import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SortField } from '@app/core/api/models/sort-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { SortDirection } from '../../../../core/api/models/sort-direction';

/**
 * Loops through unsorted -> ascending -> descending -> unsorted
 */
@Component({
  selector: 'pagination-order-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './pagination-order-button.component.html'
})
export class PaginationOrderButtonComponent implements OnChanges {

  @Input() public property = '';

  @Input() public direction = SortDirection.Unsorted;

  @Input() public disabled = false;

  @Output() public directionChange = new EventEmitter<SortField>();

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
    if (this.direction === SortDirection.Ascending) {
      // Ascending -> descending
      this.direction = SortDirection.Descending;
    } else if (this.direction === SortDirection.Descending) {
      // Descending -> unsorted
      this.direction = SortDirection.Unsorted;
    } else {
      // Unsorted -> ascending
      this.direction = SortDirection.Ascending;
    }

    const previousDirection = this.direction;
    this.updateDirection();

    const sort = new SortField(this.property);
    sort.direction = previousDirection;
    this.directionChange.emit(sort);
  }

  private updateDirection() {
    switch (this.direction) {
      case SortDirection.Ascending:
        this.directionIcon = this.ascendingIcon;
        break;
      case SortDirection.Descending:
        this.directionIcon = this.descendingIcon;
        break;
      default:
        this.directionIcon = this.defaultIcon;
        break;
    }
  }

}
