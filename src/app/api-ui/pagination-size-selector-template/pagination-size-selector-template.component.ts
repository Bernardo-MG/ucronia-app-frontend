import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pagination-size-selector-template',
  templateUrl: './pagination-size-selector-template.component.html',
  styleUrls: ['./pagination-size-selector-template.component.sass']
})
export class PaginationSizeSelectorTemplateComponent {

  @Input() public sizes: number[] = [5, 10, 15, 20];

  @Input() public size: number = 5;

  @Output() private selectSize = new EventEmitter<number>();

  constructor() { }

  public onSelect(event: any) {
    if (event.value) {
      this.selectSize.emit(event.value);
    }
  }

}
