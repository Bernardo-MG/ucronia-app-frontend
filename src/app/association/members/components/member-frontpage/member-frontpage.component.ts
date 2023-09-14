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
import { PaginationRequestParametersParser } from '@app/shared/utils/api/route/observer/parser/pagination-request-parameters-parser';
import { ActiveParametersParser } from '../../observer/active-parameters-parser';

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

  private routeActuator;

  constructor(
    private service: MemberService,
    private route: ActivatedRoute,
    router: Router,
    private authService: AuthService
  ) {
    this.routeActuator = new RouteParametersActuator(router);
  }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authService.hasPermission("member", "create");

    // TODO: both observers should be merged into a single component
    const paginationParser = new PaginationRequestParametersParser();
    const activeParser = new ActiveParametersParser();
    this.route.queryParamMap.subscribe(params => {
      const active = activeParser.parse(params);
      if (active) {
        this.activeFilter = active as Active;
      } else {
        this.activeFilter = Active.Active;
      }

      const pagination = paginationParser.parse(params);
      this.load(pagination);
    });
  }

  public onFilterActive(active: 'Active' | 'Inactive' | 'All') {
    this.activeFilter = (Active[active] as Active);
    this.routeActuator.addParameters({ page: undefined, active: this.activeFilter });
  }

  private load(pagination: PaginationRequest | undefined) {
    this.readingMembers = true;

    this.service.getAll(pagination, this.activeFilter).subscribe({
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
