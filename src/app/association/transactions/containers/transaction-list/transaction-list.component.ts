import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableHeaderCell } from '@app/core/models/table-header-cell';
import { TableRow } from '@app/core/models/table-row';
import { PageInfo } from '@app/shared/utils/api/models/page-info';
import { PaginationRequest } from '@app/shared/utils/api/models/pagination-request';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { RouteParametersActuator } from '@app/shared/utils/route/actuator/route-parameters-actuator';
import { TransactionFilter } from '../../models/transaction-filter';
import { TransactionFilterRouteObserver } from '../../route/observer/transaction-filter-route-observer';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'assoc-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.sass']
})
export class TransactionListComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

  public totalPages = 0;

  public startDate: string | undefined = undefined;

  public endDate: string | undefined = undefined;

  public date: string | undefined = undefined;

  public rows: TableRow[] = [];

  public header = [{ name: 'Description', property: 'description' }, { name: 'Date', property: 'date' }, { name: 'Amount', property: 'amount' }];

  private routeActuator: RouteParametersActuator;

  private routePaginationObserver: PaginationRequestRouteObserver;

  private filterObserver: TransactionFilterRouteObserver;

  constructor(
    private service: TransactionService,
    router: Router,
    route: ActivatedRoute
  ) {
    this.routeActuator = new RouteParametersActuator(router);
    this.routePaginationObserver = new PaginationRequestRouteObserver(route);
    this.filterObserver = new TransactionFilterRouteObserver(route);
  }

  public ngOnInit(): void {
    this.routePaginationObserver.subject.subscribe(p => {
      this.load(p, new TransactionFilter());
    });

    this.filterObserver.subject.subscribe(f => {
      const pagination = this.routePaginationObserver.subject.value;
      const filter = new TransactionFilter();
      filter.date = f?.date;
      filter.startDate = f?.startDate;
      filter.endDate = f?.endDate;

      // Updates filter data
      this.date = f?.date;
      this.startDate = f?.startDate;
      this.endDate = f?.endDate;

      this.load(pagination, filter);
    });
  }

  public isLoading(): boolean {
    return this.waiting;
  }

  public onDelete(id: number) {
    if (id > 0) {
      this.service.delete(id).subscribe(r => {
        const pagination = this.routePaginationObserver.subject.value;
        this.load(pagination, new TransactionFilter());
      });
    }
  }

  private load(pagination: PaginationRequest | undefined, filter: TransactionFilter) {
    this.waiting = true;
    this.service.getAll(pagination, filter).subscribe({
      next: page => {
        this.rows = page.content.map(m => {
          return {
            id: m.id,
            cells: [m.description, m.date, m.amount]
          };
        });


        this.totalPages = page.totalPages;
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
    this.routeActuator.setParameters({ date: this.date, startDate: this.startDate, endDate: this.endDate });
    this.load(undefined, new TransactionFilter());
  }

}
