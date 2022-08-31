import { Component, OnInit } from '@angular/core';
import { FeeService } from '@app/crud/fees/services/fee.service';
import { Fee } from '@app/models/fee';

@Component({
  selector: 'app-fee-list-view',
  templateUrl: './fee-list-view.component.html',
  styleUrls: ['./fee-list-view.component.sass']
})
export class FeeListViewComponent {

  public fees: Fee[] = [];

  constructor(
    private service: FeeService
  ) {
    this.service.getAll().subscribe(d => this.fees = d);
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(d => {
      this.service.getAll().subscribe(d => this.fees = d);
    });
  }

}
