import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { RoutePaginationRequestObserver } from '@app/api/route/observer/route-pagination-request-observer';
import { FeeService } from '@app/crud/fees/services/fee.service';
import { Fee } from '@app/models/fee';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'crud-fee-list-view',
  templateUrl: './fee-list-view.component.html',
  styleUrls: ['./fee-list-view.component.sass']
})
export class FeeListViewComponent implements OnInit {

  public fees: Fee[] = [];

  public pageInfo = new PageInfo();

  private routePaginationObserver: RoutePaginationRequestObserver;

  constructor(
    private service: FeeService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new RoutePaginationRequestObserver(route);
  }

  ngOnInit(): void {
    this.routePaginationObserver.pagination.pipe(mergeMap(p => this.service.getAll(p)))
      .subscribe(page => {
        this.fees = page.content;
        this.pageInfo = page;
      });
  }

}
