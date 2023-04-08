import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageInfo } from '@app/shared/utils/api/models/page-info';

@Component({
  selector: 'layout-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.sass']
})
export class DataListComponent {

  /**
   * Loading flag.
   */
  @Input() public waiting = false;

  @Input() public pageInfo = new PageInfo();

  @Output() public delete = new EventEmitter<void>();

  public onDelete() {
    this.delete.emit();
  }

}
