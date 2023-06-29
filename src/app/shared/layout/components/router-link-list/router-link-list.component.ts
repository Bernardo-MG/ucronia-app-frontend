import { Component, Input } from '@angular/core';
import { TableHeaderCell } from '@app/shared/layout/models/table-header-cell';
import { TableRow } from '../../models/table-row';

@Component({
  selector: 'layout-router-link-list',
  templateUrl: './router-link-list.component.html'
})
export class RouterLinkListComponent {

  @Input() public disabled = false;

  @Input() public totalPages = 0;

  @Input() public header: TableHeaderCell[] = [];

  @Input() public rows: TableRow[] = [];

  @Input() public route = '';

}
