import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { Publisher } from '../../models/publisher';

@Component({
  selector: 'assoc-library-publisher-selection',
  standalone: true,
  imports: [PaginationModule, ButtonListComponent, WaitingWrapperComponent],
  templateUrl: './library-publisher-selection.component.html'
})
export class LibraryPublisherSelectionComponent {

  @Input() public waiting = false;

  @Input() public values: Publisher[] = [];

  /**
   * Current page number. This is the pointer to move around the pagination.
   */
  @Input() public current = 1;

  /**
   * Total number of pages.
   */
  @Input() public pages = 0;

  @Output() public choose = new EventEmitter<Publisher>();

  @Output() public goToPage = new EventEmitter<number>();

  @Output() public cancel = new EventEmitter<void>();

  public onPick(gameSystem: Publisher) {
    this.choose.emit(gameSystem);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

  public onCancel() {
    this.cancel.emit();
  }

  public nameRenderer(gameSystem: Publisher) {
    return gameSystem.name;
  }

}
