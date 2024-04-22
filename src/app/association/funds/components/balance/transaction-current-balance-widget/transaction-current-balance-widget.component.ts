import { Component, OnInit } from '@angular/core';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { TransactionCurrentBalance } from '../../../models/transaction-current-balance';
import { TransactionBalanceService } from '../../../service/transaction-balance.service';

@Component({
  selector: 'assoc-transaction-current-balance-widget',
  standalone: true,
  imports: [WaitingWrapperComponent],
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
