import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '@app/association/models/member';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MemberService } from '../../services/member.service';
import { RouteApiActuator } from '@app/shared/utils/api/route/actuator/route-api-actuator';

@Component({
  selector: 'assoc-member-frontpage',
  templateUrl: './member-frontpage.component.html'
})
export class MemberFrontpageComponent implements OnInit {

  public members: Member[] = [];

  /**
   * Loading flag.
   */
  public readingMembers = false;

  public createPermission = false;

  public onlyActive = true;

  public totalPages = 0;

  private routePaginationObserver: PaginationRequestRouteObserver;

  private routeApiActuator: RouteApiActuator;

  public addIcon = faPlus;

  constructor(
    private service: MemberService,
    route: ActivatedRoute,
    router: Router,
    private authService: AuthService
  ) {
    this.routePaginationObserver = new PaginationRequestRouteObserver(route);
    this.routeApiActuator = new RouteApiActuator(router);
  }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authService.hasPermission("member", "create");

    this.routePaginationObserver.subject.subscribe(p => {
      this.load(p);
    });
  }

  public onFilterActiveMembers(event: any) {
    this.onlyActive = event.checked;
    if (this.routePaginationObserver.subject.getValue()?.page === 0) {
      this.load({ page: 0 });
    } else {
      this.routeApiActuator.setPage(0);
    }
  }

  private load(pagination: PaginationRequest | undefined) {
    this.readingMembers = true;
    this.service.getAll(pagination, this.onlyActive).subscribe({
      next: page => {
        this.members = page.content;

        this.totalPages = page.totalPages;
        // Reactivate view
        this.readingMembers = false;
      },
      error: error => {
        // Reactivate view
        this.readingMembers = false;
      }
    });
  }

}
