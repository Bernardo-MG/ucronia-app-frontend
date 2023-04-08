import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '@app/association/models/transaction';
import { PageInfo } from '@app/shared/utils/api/models/page-info';
import { PaginationRequest } from '@app/shared/utils/api/models/pagination-request';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { RouteParametersActuator } from '@app/shared/utils/route/actuator/route-parameters-actuator';
import { TransactionFilter } from '../../models/transaction-filter';
import { TransactionFilterRouteObserver } from '../../route/observer/transaction-filter-route-observer';
import { TransactionService } from '../../service/transaction.service';
import { Table } from '@app/core/models/table';

@Component({
  selector: 'admin-transaction-list-view',
  templateUrl: './transaction-list-view.component.html',
  styleUrls: ['./transaction-list-view.component.sass']
})
export class TransactionListViewComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

  public pageInfo = new PageInfo();

  public startDate: string | undefined = undefined;

  public endDate: string | undefined = undefined;

  public date: string | undefined = undefined;

  public table = new Table();

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
        const transactions = page.content;
        
        this.table = new Table();
        this.table.header = [{ name: 'description', property: 'description' }, { name: 'date', property: 'date' }, { name: 'amount', property: 'amount' }];
        this.table.rows = transactions.map(m => {
          return {
            id: m.id,
            cells: [m.description, m.date, m.amount]
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
    this.routeActuator.setParameters({ date: this.date, startDate: this.startDate, endDate: this.endDate });
    this.load(undefined, new TransactionFilter());
  }

}
