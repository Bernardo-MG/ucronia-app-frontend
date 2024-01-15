import { Component, OnInit } from '@angular/core';
import { CurrentBalance } from '../../models/current-balance';
import { TransactionBalanceService } from '../../service/transaction-balance.service';

@Component({
  selector: 'assoc-transaction-current-balance',
  templateUrl: './transaction-current-balance.component.html'
})
export class FundsCurrentBalanceComponent implements OnInit {

  public readingBalance = false;

  public balance = new CurrentBalance();

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
