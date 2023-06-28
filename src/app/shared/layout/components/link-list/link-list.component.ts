import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableHeaderCell } from '../../models/table-header-cell';
import { TableRow } from '../../models/table-row';

@Component({
  selector: 'layout-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.sass']
})
export class LinkListComponent {

  @Input() public header: TableHeaderCell[] = [];

  @Input() public rows: TableRow[] = [];

  @Output() public selectRow = new EventEmitter<number>();

  public onClick(index: number){
    this.selectRow.emit(index);
  }

}
