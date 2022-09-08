import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pagination-size-selector',
  templateUrl: './pagination-size-selector.component.html',
  styleUrls: ['./pagination-size-selector.component.sass']
})
export class PaginationSizeSelectorComponent {

  @Input() public selected: number = 5;

  @Input() public sizes: number[] = [5, 10, 15, 20];

  @Output() private select = new EventEmitter<number>();

  constructor() { }

  public selectSize(event: any) {
    if (event.value) {
      this.select.emit(event.value);
    }
  }

}
