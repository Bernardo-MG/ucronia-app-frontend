import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pagination-size-selector-template',
  templateUrl: './pagination-size-selector-template.component.html'
})
export class PaginationSizeSelectorTemplateComponent {

  @Input() public sizes: number[] = [];

  @Input() public selected = 0;

  @Input() public disabled = false;

  @Output() public selectSize = new EventEmitter<number>();

  public onSelect(event: any) {
    if (event.value) {
      this.selectSize.emit(Number(event.value));
    }
  }

}
