import { Component, Input } from '@angular/core';
import { FeeYear } from '@app/models/fee-year';

@Component({
  selector: 'admin-fee-table',
  templateUrl: './fee-table.component.html',
  styleUrls: ['./fee-table.component.sass']
})
export class FeeTableComponent {

  @Input() public year: number=  -1;

  @Input() public feeYears: FeeYear[] = [];

  constructor() { }

}
