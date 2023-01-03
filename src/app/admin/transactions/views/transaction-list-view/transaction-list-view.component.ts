import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { PaginationRequest } from '@app/api/models/pagination-request';
import { RoutePaginationRequestObserver } from '@app/api/route/observer/route-pagination-request-observer';
import { Transaction } from '@app/models/transaction';
import { mergeMap, tap } from 'rxjs';
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

  private routePaginationObserver: RoutePaginationRequestObserver;

  private selected: { id: number } = { id: -1 };

  constructor(
    private service: TransactionService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new RoutePaginationRequestObserver(route);
  }

  ngOnInit(): void {
    this.routePaginationObserver.subject.pipe(
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
    this.service.getAll(pagination).subscribe({
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
