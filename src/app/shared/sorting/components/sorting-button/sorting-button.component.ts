import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

/**
 * Loops through unsorted -> ascending -> descending -> unsorted
 */
@Component({
    selector: 'sorting-button',
    imports: [FontAwesomeModule],
    templateUrl: './sorting-button.component.html'
})
export class SortingButtonComponent implements OnChanges {

  @Input() public property = '';

  @Input() public direction = SortingDirection.Unsorted;

  @Input() public disabled = false;

  @Output() public directionChange = new EventEmitter<SortingProperty>();

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
      case SortingDirection.Ascending:
        // Ascending -> descending
        this.direction = SortingDirection.Descending;
        break;
      case SortingDirection.Descending:
        // Descending -> unsorted
        this.direction = SortingDirection.Unsorted;
        break;
      default:
        // Unsorted -> ascending
        this.direction = SortingDirection.Ascending;
        break;
    }

    this.updateDirection();

    const sort = new SortingProperty(this.property, this.direction);
    this.directionChange.emit(sort);
  }

  private updateDirection() {
    switch (this.direction) {
      case SortingDirection.Ascending:
        this.directionIcon = this.ascendingIcon;
        break;
      case SortingDirection.Descending:
        this.directionIcon = this.descendingIcon;
        break;
      default:
        this.directionIcon = this.defaultIcon;
        break;
    }
  }

}
