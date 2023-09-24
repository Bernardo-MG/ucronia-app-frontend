import { Component, Input } from '@angular/core';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'assoc-transaction-info',
  templateUrl: './transaction-info.component.html'
})
export class TransactionInfoComponent {

  @Input() data = new Transaction();

}
