import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { PaginationRequest } from '@app/api/models/pagination-request';
import { PaginationRequestRouteObserver } from '@app/api/route/observer/pagination-request-route-observer';
import { Transaction } from '@app/models/transaction';
import { RouteParametersActuator } from '@app/route/actuator/route-parameters-actuator';
import { RouteParametersObserver } from '@app/route/observer/route-params-observer';
import { filter } from 'rxjs';
import { TransactionFilter } from '../../models/transaction-filter';
import { TransactionFilterRouteObserver } from '../../route/observer/transaction-filter-route-observer';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'admin-transaction-list-view',
  templateUrl: './transaction-list-view.component.html',
  styleUrls: ['./transaction-list-view.component.sass']
})
export class TransactionListViewComponent implements OnInit {

  /**
   * Loading flag.
   */
  public loading = false;

  public transactions: Transaction[] = [];

  public pageInfo = new PageInfo();

  public startDate: string | undefined = undefined;

  public endDate: string | undefined = undefined;

  public date: string | undefined = undefined;

  private selected: { id: number } = { id: -1 };

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
      this.load(p);
    });

    this.filterObserver.subject.subscribe(f => {
      this.date = f?.date;
      this.startDate = f?.startDate;
      this.endDate = f?.endDate;

      this.load(undefined);
    });
  }

  public isLoading(): boolean {
    return (this.transactions.length == 0) && this.loading;
  }

  public onDelete() {
    if (this.selected.id > 0) {
      this.service.delete(this.selected.id).subscribe(r => {
        const pagination = this.routePaginationObserver.subject.value;
        this.load(pagination);
      });
    }
  }

  public select(data: { id: number }) {
    this.selected = data;
  }

  private load(pagination: PaginationRequest | undefined) {
    const filter = new TransactionFilter();
    filter.date = this.date;
    filter.startDate = this.startDate;
    filter.endDate = this.endDate;

    this.loading = true;
    this.service.getAll(pagination, filter).subscribe({
      next: page => {
        this.transactions = page.content;
        this.pageInfo = page;
        // Reactivate view
        this.loading = false;
      },
      error: error => {
        // Reactivate view
        this.loading = false;
      }
    });
  }

  public reload(): void {
    this.routeActuator.setParameters({ date: this.date, startDate: this.startDate, endDate: this.endDate });
    this.load(undefined);
  }

}
