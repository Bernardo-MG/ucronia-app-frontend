import { Component, Input } from '@angular/core';
import { TableHeaderCell } from '@app/shared/layout/models/table-header-cell';
import { TableRow } from '../../models/table-row';

@Component({
  selector: 'layout-router-link-list',
  templateUrl: './router-link-list.component.html'
})
export class RouterLinkListComponent {

  @Input() public header: TableHeaderCell[] = [];

  @Input() public rows: TableRow[] = [];

  @Input() public route = '';

  @Input() public routeParser = (row: TableRow) => this.getRoute(row);

  public getRoute(row: TableRow) {
    return `${this.route}/${row.id}`;
  }

}
