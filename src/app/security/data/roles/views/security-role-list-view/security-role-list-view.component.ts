import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { RoutePaginationRequestObserver } from '@app/api/route/observer/route-pagination-request-observer';
import { Role } from '@app/security/models/role';
import { mergeMap } from 'rxjs';
import { SecurityRoleService } from '../../service/security-role.service';

@Component({
  selector: 'security-role-list-view',
  templateUrl: './security-role-list-view.component.html',
  styleUrls: ['./security-role-list-view.component.sass']
})
export class SecurityRoleListViewComponent implements OnInit {

  public roles: Role[] = [];

  public pageInfo = new PageInfo();

  private routePaginationObserver: RoutePaginationRequestObserver;

  constructor(
    private service: SecurityRoleService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new RoutePaginationRequestObserver(route);
  }

  ngOnInit(): void {
    this.routePaginationObserver.subject.pipe(mergeMap(p => this.service.getAll(p)))
      .subscribe(page => {
        this.roles = page.content;
        this.pageInfo = page;
      });
  }

}
