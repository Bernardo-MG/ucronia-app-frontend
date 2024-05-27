import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SortProperty } from '@app/core/api/models/sort-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { SortDirection } from '../../../../core/api/models/sort-direction';

/**
 * Loops through unsorted -> ascending -> descending -> unsorted
 */
@Component({
  selector: 'sorting-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './sorting-button.component.html'
})
export class SortingButtonComponent implements OnChanges {

  @Input() public property = '';

  @Input() public direction = SortDirection.Unsorted;

  @Input() public disabled = false;

  @Output() public directionChange = new EventEmitter<SortProperty>();

  /**
   * Ascending order icon.
   */
  private ascendingIcon = faSortUp;

  /**
   * Descending order icon.
   */
  private descendingIcon = faSortDown;

  /**
   * Default order icon.
   */
  private defaultIcon = faSort;

  /**
   * Current order icon.
   */
  public directionIcon = this.defaultIcon;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['direction']) {
      this.updateDirection();
    }
  }

  public onChangeDirection() {
    switch (this.direction) {
      case SortDirection.Ascending:
        // Ascending -> descending
        this.direction = SortDirection.Descending;
        break;
      case SortDirection.Descending:
        // Descending -> unsorted
        this.direction = SortDirection.Unsorted;
        break;
      default:
        // Unsorted -> ascending
        this.direction = SortDirection.Ascending;
        break;
    }

    this.updateDirection();

    const sort = new SortProperty(this.property, this.direction);
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
