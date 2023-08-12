import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { TableHeaderCell } from '@app/shared/layout/models/table-header-cell';
import { TableRow } from '@app/shared/layout/models/table-row';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FeeService } from '../../services/fee.service';
import { AuthService } from '@app/core/authentication/services/auth.service';

@Component({
  selector: 'assoc-fee-list',
  templateUrl: './fee-list.component.html'
})
export class FeeListComponent implements OnInit {

  /**
   * Waiting flag.
   */
  public waiting = false;

  public createPermission = false;

  public totalPages = 0;

  public startDate: string | undefined = undefined;

  public endDate: string | undefined = undefined;

  public header: TableHeaderCell[] = [];

  public rows: TableRow[] = [];

  private routePaginationObserver: PaginationRequestRouteObserver;
  
  public addIcon = faPlus;

  constructor(
    private service: FeeService,
    route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.routePaginationObserver = new PaginationRequestRouteObserver(route);
  }

  ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authService.hasPermission("fee", "create");

    this.header = [{ name: 'Name', property: 'name' }, { name: 'Pay date', property: 'date' }, { name: 'Paid', property: 'paid' }];

    this.routePaginationObserver.subject.subscribe(p => {
      this.load(p);
    });
  }

  private load(pagination: PaginationRequest | undefined) {
    this.waiting = true;
    this.service.getAll(pagination, this.startDate, this.endDate).subscribe({
      next: page => {
        const fees = page.content;

        this.rows = fees.map(f => {
          return {
            id: f.id,
            cells: [f.memberName, f.date, f.paid]
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
    const pagination = this.routePaginationObserver.subject.value;
    this.load(pagination);
  }

}
