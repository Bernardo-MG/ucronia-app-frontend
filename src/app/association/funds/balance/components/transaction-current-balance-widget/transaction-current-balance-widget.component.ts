import { Component, OnInit } from '@angular/core';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { TransactionCurrentBalance } from '../../../shared/models/transaction-current-balance';
import { TransactionBalanceService } from '../../services/transaction-balance.service';

@Component({
  selector: 'assoc-transaction-current-balance-widget',
  standalone: true,
  imports: [BlockUiDirective],
  templateUrl: './transaction-current-balance-widget.component.html'
})
export class FundsCurrentBalanceWidgetComponent implements OnInit {

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