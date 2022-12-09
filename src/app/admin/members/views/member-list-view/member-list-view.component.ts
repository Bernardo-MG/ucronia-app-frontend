import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { PaginationRequest } from '@app/api/models/pagination-request';
import { RoutePaginationRequestObserver } from '@app/api/route/observer/route-pagination-request-observer';
import { MemberService } from '@app/admin/members/services/member.service';
import { Member } from '@app/models/member';
import { mergeMap, tap } from 'rxjs';

@Component({
  selector: 'crud-member-list-view',
  templateUrl: './member-list-view.component.html',
  styleUrls: ['./member-list-view.component.sass']
})
export class MemberListViewComponent implements OnInit {

  /**
   * Loading flag.
   */
  public loading = false;

  public members: Member[] = [];

  public pageInfo = new PageInfo();

  public activeCount = 0;

  private routePaginationObserver: RoutePaginationRequestObserver;

  private selected = new Member();

  constructor(
    private service: MemberService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new RoutePaginationRequestObserver(route);
  }

  public ngOnInit(): void {
    this.routePaginationObserver.pagination.pipe(
      tap(p => this.loading = true),
      mergeMap(p => this.service.getAll(p)))
      .subscribe({
        next: page => {
          this.members = page.content;
          this.pageInfo = page;
          // Reactivate view
          this.loading = false;
        },
        error: error => {
          // Reactivate view
          this.loading = false;
        }
      });

    this.service.countActive().subscribe(r => this.activeCount = r);
  }

  public select(data: Member) {
    this.selected = data;
  }

  public onDelete() {
    if (this.selected.id > 0) {
      this.service.delete(this.selected.id).subscribe(r => {
        const pagination = this.routePaginationObserver.pagination.value;
        this.load(pagination);
      });
    }
  }

  private load(pagination: PaginationRequest | undefined) {
    this.service.getAll(pagination).subscribe({
      next: page => {
        this.members = page.content;
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
