import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fee } from '@app/models/fee';

@Component({
  selector: 'admin-fee-table-form',
  templateUrl: './fee-table-form.component.html',
  styleUrls: ['./fee-table-form.component.sass']
})
export class FeeTableFormComponent {

  @Input() data: Fee[] = [];

  @Output() save = new EventEmitter<Fee>();

  constructor() { }

}
