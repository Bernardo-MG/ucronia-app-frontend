import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { RoutePaginationRequestObserver } from '@app/api/route/observer/route-pagination-request-observer';
import { TransactionService } from '@app/crud/transactions/service/transaction.service';
import { Transaction } from '@app/models/transaction';
import { mergeMap, tap } from 'rxjs';

@Component({
  selector: 'crud-transaction-list-view',
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

  private routePaginationObserver: RoutePaginationRequestObserver;

  constructor(
    private service: TransactionService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new RoutePaginationRequestObserver(route);
  }

  ngOnInit(): void {
    this.loading = true;
    this.routePaginationObserver.pagination.pipe(
      tap(p => this.loading = true),
      mergeMap(p => this.service.getAll(p)))
      .subscribe({
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

}
