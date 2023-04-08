import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table } from '@app/core/models/table';
import { PageInfo } from '@app/shared/utils/api/models/page-info';

@Component({
  selector: 'layout-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.sass']
})
export class DataListComponent {

  @Input() public disabled = false;

  @Input() public pageInfo = new PageInfo();

  @Input() public table = new Table();

  @Input() public route = '';

  @Output() public delete = new EventEmitter<number>();

  private selected = 0;

  public onSelect(id: number) {
    this.selected = id;
  }

  public onDelete() {
    this.delete.emit(this.selected);
  }

}
