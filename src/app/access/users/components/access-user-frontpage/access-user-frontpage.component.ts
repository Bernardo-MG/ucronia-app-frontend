import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { User } from '@app/core/authentication/models/user';
import { AuhtContainer } from '@app/core/authentication/services/auth.service';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-frontpage',
  templateUrl: './access-user-frontpage.component.html'
})
export class AccessFrontpageComponent implements OnInit {

  /**
   * Loading flag.
   */
  public readingRoles = false;

  public createPermission = false;

  public users: User[] = [];

  public totalPages = 0;

  private selected: { id: number } = { id: -1 };

  private routePaginationObserver: PaginationRequestRouteObserver;

  public addIcon = faPlus;

  constructor(
    private service: AccessUserService,
    route: ActivatedRoute,
    private authService: AuhtContainer
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
    this.readingRoles = true;
    this.service.getAll(pagination).subscribe({
      next: page => {
        this.users = page.content;

        this.totalPages = page.totalPages;
        // Reactivate view
        this.readingRoles = false;
      },
      error: error => {
        // Reactivate view
        this.readingRoles = false;
      }
    });
  }

}
