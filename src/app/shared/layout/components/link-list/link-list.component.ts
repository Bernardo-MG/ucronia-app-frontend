import { Component, Input } from '@angular/core';
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

}
