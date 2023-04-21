import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableRow } from '@app/shared/layout/models/table-row';
import { PaginationRequest } from '@app/shared/utils/api/models/pagination-request';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-list-view',
  templateUrl: './access-user-list-view.component.html'
})
export class AccessUserListViewComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

  public rows: TableRow[] = [];

  public header = [{ name: 'Username', property: 'username' }];

  public totalPages = 0;

  private selected: { id: number } = { id: -1 };

  private routePaginationObserver: PaginationRequestRouteObserver;

  constructor(
    private service: AccessUserService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new PaginationRequestRouteObserver(route);
  }

  ngOnInit(): void {
    this.routePaginationObserver.subject.subscribe(p => {
      this.load(p);
    });
  }

  public onDelete(id: number) {
    if (this.selected.id > 0) {
      this.service.delete(this.selected.id).subscribe(r => {
        const pagination = this.routePaginationObserver.subject.value;
        this.load(pagination);
      });
    }
  }

  private load(pagination: PaginationRequest | undefined) {
    this.waiting = true;
    this.service.getAll(pagination).subscribe({
      next: page => {

        this.rows = page.content.map(m => {
          return {
            id: m.id,
            cells: [m.username]
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

}
