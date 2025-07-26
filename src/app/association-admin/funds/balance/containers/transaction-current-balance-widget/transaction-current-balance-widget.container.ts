import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BlockUiDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { TransactionCurrentBalance } from '../../../../../models/transactions/transaction-current-balance';
import { TransactionBalanceService } from '../../services/transaction-balance.service';

@Component({
  selector: 'assoc-transaction-current-balance-widget',
  imports: [CommonModule, CardModule, BlockUiDirective],
  templateUrl: './transaction-current-balance-widget.container.html'
})
export class FundsCurrentBalanceWidgetContainer {

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
