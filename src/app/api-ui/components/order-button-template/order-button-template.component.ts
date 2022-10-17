import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'order-button-template',
  templateUrl: './order-button-template.component.html',
  styleUrls: ['./order-button-template.component.sass']
})
export class OrderButtonTemplateComponent implements OnChanges {

  @Input() public direction: 'asc' | 'desc' | 'unsorted' = 'unsorted';

  @Output() public ascending = new EventEmitter<void>();

  @Output() public descending = new EventEmitter<void>();

  public directionIcon;

  private ascendingIcon = faSortUp;
  private descendingIcon = faSortDown;
  private defaultIcon = faSort;

  constructor() {
    this.directionIcon = this.defaultIcon;
  }

  ngOnChanges(): void {
    // Switch icons
    switch (this.direction) {
      case 'asc': {
        this.directionIcon = this.ascendingIcon;
        break;
      }
      case 'desc': {
        this.directionIcon = this.descendingIcon;
        break;
      }
      default: {
        this.directionIcon = this.defaultIcon;
      }
    }
  }

  public onChangeOrder() {
    switch (this.direction) {
      case 'asc': {
        // Currently it is in ascending order
        // Switching to descending order
        this.direction = 'desc';

        this.directionIcon = this.descendingIcon;
        this.descending.emit();
        break;
      }
      case 'desc': {
        // Currently it is in descending order
        // Switching to ascending order
        this.direction = 'asc';

        this.directionIcon = this.ascendingIcon;
        this.ascending.emit();
        break;
      }
      default: {
        // Any other case
        // Switching to descending order
        this.direction = 'desc';

        this.directionIcon = this.descendingIcon;
        this.descending.emit();
        break;
      }
    }
  }

}
