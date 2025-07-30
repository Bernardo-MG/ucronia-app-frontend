import { Component, EventEmitter, Output, input } from '@angular/core';

@Component({
  selector: 'form-paged-selector',
  templateUrl: './paged-selector.component.html'
})
export abstract class PagedSelectorComponent<Data> {

  public readonly waiting = input(false);

  public readonly values = input<Data[]>([]);

  /**
   * Current page number. This is the pointer to move around the pagination.
   */
  public readonly current = input(1);

  /**
   * Total number of pages.
   */
  public readonly pages = input(0);

  @Output() public choose = new EventEmitter<Data>();

  @Output() public goToPage = new EventEmitter<number>();

  public onPick(data: Data) {
    this.choose.emit(data);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

}
