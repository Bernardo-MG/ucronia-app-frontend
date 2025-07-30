import { Component, input, output } from '@angular/core';

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

  public readonly choose = output<Data>();

  public readonly goToPage = output<number>();

  public onPick(data: Data) {
    this.choose.emit(data);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

}
