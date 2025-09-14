
import { Component, inject } from '@angular/core';
import { TransactionCurrentBalance } from '@app/domain/transactions/transaction-current-balance';
import { BlockUiDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { TransactionBalanceService } from '../transaction-balance-service/transaction-balance-service';

@Component({
  selector: 'assoc-transaction-current-balance-widget',
  imports: [CardModule, BlockUiDirective],
  templateUrl: './transaction-current-balance.html'
})
export class FundsCurrentBalance {

  public readingBalance = false;

  public balance = new TransactionCurrentBalance();

  constructor() {
    const service = inject(TransactionBalanceService);

    this.readingBalance = true;
    service.current().subscribe(b => {
      this.balance = b;
      this.readingBalance = false;
    });
  }

}
