import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Role } from '@app/core/authentication/models/role';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
  selector: 'access-role-list',
  templateUrl: './access-role-list.component.html'
})
export class AccessRoleListComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

  public createPermission = false;

  public roles: Role[] = [];

  public totalPages = 0;

  private routePaginationObserver: PaginationRequestRouteObserver;

  public addIcon = faPlus;

  constructor(
    private service: AccessRoleService,
    route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.routePaginationObserver = new PaginationRequestRouteObserver(route);
  }

  ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authService.hasPermission("role", "create");

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

        this.roles = page.content;

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

}
