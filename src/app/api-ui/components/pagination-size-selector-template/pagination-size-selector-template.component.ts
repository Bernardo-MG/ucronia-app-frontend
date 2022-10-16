import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pagination-size-selector-template',
  templateUrl: './pagination-size-selector-template.component.html',
  styleUrls: ['./pagination-size-selector-template.component.sass']
})
export class PaginationSizeSelectorTemplateComponent {

  @Input() public sizes: number[] = [];

  @Input() public selected: number = 0;

  @Output() public selectSize = new EventEmitter<number>();

  constructor() { }

  public onSelect(event: any) {
    if (event.value) {
      this.selectSize.emit(Number(event.value));
    }
  }

}
