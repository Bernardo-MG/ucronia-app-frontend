import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { Pagination } from '@app/api/models/pagination';
import { RoutePaginationObserver } from '@app/api/route/observer/route-pagination-observer';
import { FeeService } from '@app/crud/fees/services/fee.service';
import { Fee } from '@app/models/fee';

@Component({
  selector: 'crud-fee-list-view',
  templateUrl: './fee-list-view.component.html',
  styleUrls: ['./fee-list-view.component.sass']
})
export class FeeListViewComponent implements OnInit {

  public fees: Fee[] = [];

  public pageInfo = new PageInfo();

  private routePaginationObserver: RoutePaginationObserver;

  constructor(
    private service: FeeService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new RoutePaginationObserver(route)
  }

  ngOnInit(): void {
    // Initial request
    this.load({});
    // Listens for changes on pagination params
    this.routePaginationObserver.pagination.subscribe(pagination => {
      this.load(pagination);
    });
  }

  private load(pagination: Pagination) {
    this.service.getAll(pagination).subscribe(page => {
      this.fees = page.content;
      this.pageInfo = page;
    });
  }

}
