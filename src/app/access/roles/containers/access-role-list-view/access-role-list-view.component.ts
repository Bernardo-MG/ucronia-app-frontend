import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableRow } from '@app/shared/layout/models/table-row';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
  selector: 'access-role-list-view',
  templateUrl: './access-role-list-view.component.html'
})
export class AccessRoleListViewComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

  public rows: TableRow[] = [];

  public header = [{ name: 'Name', property: 'name' }];

  public totalPages = 0;

  private routePaginationObserver: PaginationRequestRouteObserver;

  constructor(
    private service: AccessRoleService,
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
    if (id > 0) {
      this.service.delete(id).subscribe(r => {
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
            cells: [m.name]
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
