import { Component, OnInit } from '@angular/core';
import { BlockUiDirective } from '@bernardo-mg/layout';
import { TransactionCurrentBalance } from '../../../../../models/transactions/transaction-current-balance';
import { TransactionBalanceService } from '../../services/transaction-balance.service';

@Component({
    selector: 'assoc-transaction-current-balance-widget',
    imports: [BlockUiDirective],
    templateUrl: './transaction-current-balance-widget.container.html'
})
export class FundsCurrentBalanceWidgetContainer implements OnInit {

  public readingBalance = false;

  public balance = new TransactionCurrentBalance();

  constructor(
    private balanceService: TransactionBalanceService
  ) { }

  ngOnInit(): void {
    this.readingBalance = true;
    this.balanceService.current().subscribe(b => {
      this.balance = b;
      this.readingBalance = false;
    });
  }

}
