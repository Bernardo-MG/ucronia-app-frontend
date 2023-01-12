import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { PaginationRequest } from '@app/api/models/pagination-request';
import { PaginationRequestRouteObserver } from '@app/api/route/observer/pagination-request-route-observer';
import { Transaction } from '@app/models/transaction';
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

  private routePaginationObserver: PaginationRequestRouteObserver;

  private selected: { id: number } = { id: -1 };

  constructor(
    private service: TransactionService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new PaginationRequestRouteObserver(route);
  }

  public ngOnInit(): void {
    this.routePaginationObserver.subject.subscribe(p => {
      this.load(p);
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
    this.loading = true;
    this.service.getAll(pagination, this.startDate, this.endDate).subscribe({
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
    this.load(undefined);
  }

}
