import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { PaginationRequest } from '@app/api/models/pagination-request';
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

  /**
   * Loading flag.
   */
  public loading = false;

  public users: User[] = [];

  public pageInfo = new PageInfo();

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
    return (this.users.length == 0) && this.loading;
  }

  public select(data: { id: number }) {
    this.selected = data;
  }

  public onDelete() {
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
        this.users = page.content;
        this.pageInfo = page;
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
