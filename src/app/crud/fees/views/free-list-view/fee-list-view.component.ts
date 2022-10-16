import { Component, OnInit } from '@angular/core';
import { PageInfo } from '@app/api/models/page-info';
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

  constructor(
    private service: FeeService
  ) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(page => {
      this.fees = page.content;
      this.pageInfo = page;
    });
  }

}
