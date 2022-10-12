import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { PaginationRequest } from '@app/api/models/pagination-request';
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

    // Listens for changes on pagination params
    this.routePaginationObserver.pagination.subscribe(pagination => {
      this.load(pagination);
    });
  }

  ngOnInit(): void {
    // Initial request
    if (this.routePaginationObserver.empty) {
      this.load();
    }
  }

  private load(pagination: PaginationRequest = new PaginationRequest()) {
    this.service.getAll(pagination).subscribe(page => {
      this.fees = page.content;
      this.pageInfo = page;
    });
  }

}
