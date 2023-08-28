import { Component, Input } from '@angular/core';
import { Transaction } from '@app/association/models/transaction';

@Component({
  selector: 'assoc-transaction-selection-list',
  templateUrl: './transaction-selection-list.component.html'
})
export class TransactionSelectionListComponent {

  @Input() public transactions: Transaction[] = [];

}
