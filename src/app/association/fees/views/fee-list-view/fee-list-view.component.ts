import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { PaginationRequest } from '@app/api/models/pagination-request';
import { PaginationRequestRouteObserver } from '@app/api/route/observer/pagination-request-route-observer';
import { Fee } from '@app/association/models/fee';
import { mergeMap, tap } from 'rxjs';
import { FeeService } from '../../services/fee.service';

@Component({
  selector: 'admin-fee-list-view',
  templateUrl: './fee-list-view.component.html',
  styleUrls: ['./fee-list-view.component.sass']
})
export class FeeListViewComponent implements OnInit {

  /**
   * Loading flag.
   */
  public loading = false;

  public fees: Fee[] = [];

  public pageInfo = new PageInfo();

  public startDate: string | undefined = undefined;

  public endDate: string | undefined = undefined;

  private routePaginationObserver: PaginationRequestRouteObserver;

  private selected: { id: number } = { id: -1 };

  constructor(
    private service: FeeService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new PaginationRequestRouteObserver(route);
  }

  ngOnInit(): void {
    this.routePaginationObserver.subject.subscribe(p => {
      this.load(p);
    });
  }

  public onDelete() {
    if (this.selected.id > 0) {
      this.service.delete(this.selected.id).subscribe(r => {
        const pagination = this.routePaginationObserver.subject.value;
        this.load(pagination);
      });
    }
  }

  public onSelect(data: { id: number }) {
    this.selected = data;
  }

  private load(pagination: PaginationRequest | undefined) {
    this.loading = true;
    this.service.getAll(pagination, this.startDate, this.endDate).subscribe({
      next: page => {
        this.fees = page.content;
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

  public reload(): void {
    this.load(undefined);
  }

}
