import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '@app/association/models/member';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { RouteApiActuator } from '@app/shared/utils/api/route/actuator/route-api-actuator';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { RouteParametersActuator } from '@app/shared/utils/route/actuator/route-parameters-actuator';
import { Active } from '../../models/active';
import { ActiveRouteObserver } from '../../observer/active-route-observer';
import { MemberService } from '../../services/member.service';

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

  public activeFilter = Active.Active;

  public totalPages = 0;

  private routePaginationObserver: PaginationRequestRouteObserver;

  private routeActuator;

  private activeRouteObserver;

  private currentPage = 0;

  constructor(
    private service: MemberService,
    route: ActivatedRoute,
    router: Router,
    private authService: AuthService
  ) {
    this.routePaginationObserver = new PaginationRequestRouteObserver(route);
    this.routeActuator = new RouteParametersActuator(router);
    this.activeRouteObserver = new ActiveRouteObserver(route);
  }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authService.hasPermission("member", "create");

    this.routePaginationObserver.subject.subscribe(p => {
      if (!this.readingMembers) {
        this.load(p);
      }
    });
    this.activeRouteObserver.subject.subscribe(p => {
      if ((!this.readingMembers) && (this.currentPage === 0)) {
        this.load({ page: 0 });
      }
    });
  }

  public onFilterActive(active: 'Active' | 'Inactive' | 'All') {
    this.activeFilter = (Active[active] as Active);
    this.routeActuator.addParameters({ active: this.activeFilter });
  }

  private load(pagination: PaginationRequest | undefined) {
    this.readingMembers = true;

    this.service.getAll(pagination, this.activeFilter).subscribe({
      next: page => {
        this.members = page.content;

        this.currentPage = page.page;
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
