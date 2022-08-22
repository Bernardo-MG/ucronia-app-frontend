import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fee } from '@app/models/fee';

@Component({
  selector: 'admin-fee-table',
  templateUrl: './fee-table.component.html',
  styleUrls: ['./fee-table.component.sass']
})
export class FeeTableComponent {

  @Input() data: Fee[] = [];

  constructor() { }

}
