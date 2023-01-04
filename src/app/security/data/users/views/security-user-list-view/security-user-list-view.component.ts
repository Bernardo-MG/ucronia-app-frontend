import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { PaginationRequestRouteObserver } from '@app/api/route/observer/pagination-request-route-observer';
import { User } from '@app/security/models/user';
import { mergeMap } from 'rxjs';
import { SecurityUserService } from '../../service/security-user.service';

@Component({
  selector: 'security-user-list-view',
  templateUrl: './security-user-list-view.component.html',
  styleUrls: ['./security-user-list-view.component.sass']
})
export class SecurityUserListViewComponent implements OnInit {

  public users: User[] = [];

  public pageInfo = new PageInfo();

  private routePaginationObserver: PaginationRequestRouteObserver;

  constructor(
    private service: SecurityUserService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new PaginationRequestRouteObserver(route);
  }

  ngOnInit(): void {
    this.routePaginationObserver.subject.pipe(mergeMap(p => this.service.getAll(p)))
      .subscribe(page => {
        this.users = page.content;
        this.pageInfo = page;
      });
  }

}
