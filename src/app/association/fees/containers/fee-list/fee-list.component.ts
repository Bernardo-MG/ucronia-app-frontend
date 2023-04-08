import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from '@app/core/models/table';
import { TableHeaderCell } from '@app/core/models/table-header-cell';
import { PageInfo } from '@app/shared/utils/api/models/page-info';
import { PaginationRequest } from '@app/shared/utils/api/models/pagination-request';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { FeeService } from '../../services/fee.service';
import { TableRow } from '@app/core/models/table-row';

@Component({
  selector: 'admin-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrls: ['./fee-list.component.sass']
})
export class FeeListComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

  public pageInfo = new PageInfo();

  public startDate: string | undefined = undefined;

  public endDate: string | undefined = undefined;

  public header: TableHeaderCell[] = [];

  public rows: TableRow[] = [];

  private routePaginationObserver: PaginationRequestRouteObserver;

  constructor(
    private service: FeeService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new PaginationRequestRouteObserver(route);
  }

  ngOnInit(): void {
    this.header = [{ name: 'name', property: 'name' }, { name: 'surname', property: 'surname' }, { name: 'pay date', property: 'date' }, { name: 'paid', property: 'paid' }];

    this.routePaginationObserver.subject.subscribe(p => {
      this.load(p);
    });
  }

  public onDelete(id: number) {
    if (id > 0) {
      this.service.delete(id).subscribe(r => {
        const pagination = this.routePaginationObserver.subject.value;
        this.load(pagination);
      });
    }
  }

  private load(pagination: PaginationRequest | undefined) {
    this.waiting = true;
    this.service.getAll(pagination, this.startDate, this.endDate).subscribe({
      next: page => {
        const fees = page.content;

        this.rows = fees.map(f => {
          return {
            id: f.id,
            cells: [f.name, f.surname, f.date, f.paid]
          };
        });

        this.pageInfo = page;
        // Reactivate view
        this.waiting = false;
      },
      error: error => {
        // Reactivate view
        this.waiting = false;
      }
    });
  }

  public reload(): void {
    this.load(undefined);
  }

}
