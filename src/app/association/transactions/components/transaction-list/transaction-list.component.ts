import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '@app/association/models/transaction';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { RouteParametersActuator } from '@app/shared/utils/route/actuator/route-parameters-actuator';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TransactionFilter } from '../../models/transaction-filter';
import { TransactionFilterRouteObserver } from '../../route/observer/transaction-filter-route-observer';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'assoc-transaction-list',
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

  public createPermission = false;

  public transactions: Transaction[] = [];

  public totalPages = 0;

  public startDate: string | undefined = undefined;

  public endDate: string | undefined = undefined;

  public date: string | undefined = undefined;

  private routeActuator: RouteParametersActuator;

  private routePaginationObserver: PaginationRequestRouteObserver;

  private filterObserver: TransactionFilterRouteObserver;
  
  public addIcon = faPlus;

  constructor(
    private service: TransactionService,
    router: Router,
    route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.routeActuator = new RouteParametersActuator(router);
    this.routePaginationObserver = new PaginationRequestRouteObserver(route);
    this.filterObserver = new TransactionFilterRouteObserver(route);
  }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authService.hasPermission("transaction", "create");

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

  private load(pagination: PaginationRequest | undefined, filter: TransactionFilter) {
    this.waiting = true;
    this.service.getAll(pagination, filter).subscribe({
      next: page => {
        this.transactions = page.content;

        this.totalPages = page.totalPages - 1;
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
    const pagination = this.routePaginationObserver.subject.value;
    this.load(pagination, new TransactionFilter());
  }

}
