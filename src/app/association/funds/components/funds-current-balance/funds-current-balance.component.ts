import { Component, OnInit } from '@angular/core';
import { MonthlyBalance } from '../../models/monthly-balance';
import { BalanceService } from '../../service/balance.service';

@Component({
  selector: 'assoc-funds-current-balance',
  templateUrl: './funds-current-balance.component.html'
})
export class FundsCurrentBalanceComponent implements OnInit {

  public readingBalance = false;

  public balance = new MonthlyBalance();

  constructor(
    private balanceService: BalanceService
  ) { }

  ngOnInit(): void {
    this.readingBalance = true;
    this.balanceService.current().subscribe(b => {
      this.balance = b;
      this.readingBalance = false;
    });
  }

}
