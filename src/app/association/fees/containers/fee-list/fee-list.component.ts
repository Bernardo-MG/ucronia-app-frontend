import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeaderCell } from '@app/shared/layout/models/table-header-cell';
import { TableRow } from '@app/shared/layout/models/table-row';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { FeeService } from '../../services/fee.service';

@Component({
  selector: 'assoc-fee-list',
  templateUrl: './fee-list.component.html'
})
export class FeeListComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

  public totalPages = 0;

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
    this.header = [{ name: 'Name', property: 'name' }, { name: 'Surname', property: 'surname' }, { name: 'Pay date', property: 'date' }, { name: 'Paid', property: 'paid' }];

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
    this.load(undefined);
  }

}
