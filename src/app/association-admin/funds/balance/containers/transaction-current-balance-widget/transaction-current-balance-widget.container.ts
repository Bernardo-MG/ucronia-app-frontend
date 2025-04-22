import { Component } from '@angular/core';
import { BlockUiDirective } from '@bernardo-mg/ui';
import { TransactionCurrentBalance } from '../../../../../models/transactions/transaction-current-balance';
import { TransactionBalanceService } from '../../services/transaction-balance.service';

@Component({
  selector: 'assoc-transaction-current-balance-widget',
  imports: [BlockUiDirective],
  templateUrl: './transaction-current-balance-widget.container.html'
})
export class FundsCurrentBalanceWidgetContainer {

  public readingBalance = false;

  public balance = new TransactionCurrentBalance();

  constructor(service: TransactionBalanceService) {
    this.readingBalance = true;
    service.current().subscribe(b => {
      this.balance = b;
      this.readingBalance = false;
    });
  }

}
