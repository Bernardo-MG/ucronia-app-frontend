import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableHeaderCell } from '@app/shared/layout/models/table-header-cell';
import { TableRow } from '../../models/table-row';

@Component({
  selector: 'layout-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.sass']
})
export class DataListComponent {

  @Input() public disabled = false;

  @Input() public totalPages = 0;
  
  @Input() public header: TableHeaderCell[] = [];
  
  @Input() public rows: TableRow[] = [];

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
