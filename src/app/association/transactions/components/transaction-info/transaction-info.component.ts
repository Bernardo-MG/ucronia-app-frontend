import { Component, Input } from '@angular/core';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'assoc-transaction-info',
  standalone: true,
  imports: [],
  templateUrl: './transaction-info.component.html'
})
export class TransactionInfoComponent {

  @Input() public data = new Transaction();

}
