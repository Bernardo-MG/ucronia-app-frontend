import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '@app/association/models/member';
import { PageInfo } from '@app/shared/utils/api/models/page-info';
import { PaginationRequest } from '@app/shared/utils/api/models/pagination-request';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { MemberService } from '../../services/member.service';
import { Table } from '@app/core/models/table';

@Component({
  selector: 'admin-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.sass']
})
export class MemberListViewComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

  public pageInfo = new PageInfo();

  public table = new Table();

  private routePaginationObserver: PaginationRequestRouteObserver;

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
        const members = page.content;

        this.table = new Table();
        this.table.header = [{ name: 'name', property: 'name' }, { name: 'surname', property: 'surname' }, { name: 'active', property: 'active' }];
        this.table.rows = members.map(m => {
          return {
            id: m.id,
            cells: [m.name, m.surname, m.active]
          };
        });

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
