import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paged-selector',
  templateUrl: './paged-selector.component.html'
})
export abstract class PagedSelectorComponent<Data> {

  @Input() public waiting = false;

  @Input() public values: Data[] = [];

  /**
   * Current page number. This is the pointer to move around the pagination.
   */
  @Input() public current = 1;

  /**
   * Total number of pages.
   */
  @Input() public pages = 0;

  @Output() public choose = new EventEmitter<Data>();

  @Output() public goToPage = new EventEmitter<number>();

  public onPick(data: Data) {
    this.choose.emit(data);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

  public abstract nameRenderer(data: Data): string

}
