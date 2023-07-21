import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { TableRow } from '@app/shared/layout/models/table-row';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AccessUserService } from '../../services/access-user.service';
import { AuthService } from '@app/core/authentication/services/auth.service';

@Component({
  selector: 'access-user-list',
  templateUrl: './access-user-list.component.html'
})
export class AccessUserListComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

  public createPermission = false;

  public rows: TableRow[] = [];

  public header = [{ name: 'Username', property: 'username' }];

  public totalPages = 0;

  private selected: { id: number } = { id: -1 };

  private routePaginationObserver: PaginationRequestRouteObserver;
  
  public addIcon = faPlus;

  constructor(
    private service: AccessUserService,
    route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.routePaginationObserver = new PaginationRequestRouteObserver(route);
  }

  ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authService.hasPermission("user", "create");

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
