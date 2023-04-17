import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/core/authentication/models/user';
import { PaginationRequest } from '@app/shared/utils/api/models/pagination-request';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { SecurityUserService } from '../../services/security-user.service';
import { TableRow } from '@app/core/models/table-row';

@Component({
  selector: 'security-user-list-view',
  templateUrl: './security-user-list-view.component.html',
  styleUrls: ['./security-user-list-view.component.sass']
})
export class SecurityUserListViewComponent implements OnInit {

  /**
   * Loading flag.
   */
  public loading = false;

  public rows: TableRow[] = [];

  public header = [{ name: 'Username', property: 'username' }];

  public totalPages = 0;

  private selected: { id: number } = { id: -1 };

  private routePaginationObserver: PaginationRequestRouteObserver;

  constructor(
    private service: SecurityUserService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new PaginationRequestRouteObserver(route);
  }

  ngOnInit(): void {
    this.routePaginationObserver.subject.subscribe(p => {
      this.load(p);
    });
  }

  public isLoading(): boolean {
    return this.loading;
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
    this.loading = true;
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
        this.loading = false;
      },
      error: error => {
        // Reactivate view
        this.loading = false;
      }
    });
  }

}
