import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { PaginationRequest } from '@app/api/models/pagination-request';
import { PaginationRequestRouteObserver } from '@app/api/route/observer/pagination-request-route-observer';
import { Member } from '@app/association/models/member';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'admin-member-list-view',
  templateUrl: './member-list-view.component.html',
  styleUrls: ['./member-list-view.component.sass']
})
export class MemberListViewComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

  public members: Member[] = [];

  public pageInfo = new PageInfo();

  private routePaginationObserver: PaginationRequestRouteObserver;

  private selected: { id: number } = { id: -1 };

  constructor(
    private service: MemberService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new PaginationRequestRouteObserver(route);
  }

  public ngOnInit(): void {
    this.routePaginationObserver.subject.subscribe(p => {
      this.load(p);
    });
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
    this.waiting = true;
    this.service.getAll(pagination).subscribe({
      next: page => {
        this.members = page.content;
        this.pageInfo = page;
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
