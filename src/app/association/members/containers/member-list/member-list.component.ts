import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeaderCell } from '@app/core/models/table-header-cell';
import { TableRow } from '@app/core/models/table-row';
import { PaginationRequest } from '@app/shared/utils/api/models/pagination-request';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'assoc-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.sass']
})
export class MemberListComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

  public totalPages = 0;

  public header: TableHeaderCell[] = [];

  public rows: TableRow[] = [];

  private routePaginationObserver: PaginationRequestRouteObserver;

  constructor(
    private service: MemberService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new PaginationRequestRouteObserver(route);
  }

  public ngOnInit(): void {
    this.header = [{ name: 'name', property: 'name' }, { name: 'surname', property: 'surname' }, { name: 'active', property: 'active' }];

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

        this.rows = members.map(m => {
          return {
            id: m.id,
            cells: [m.name, m.surname, m.active]
          };
        });

        this.totalPages = page.totalPages;
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
