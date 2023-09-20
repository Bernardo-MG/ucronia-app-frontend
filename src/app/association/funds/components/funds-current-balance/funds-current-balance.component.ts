import { Component, OnInit } from '@angular/core';
import { CurrentBalance } from '../../models/current-balance';
import { BalanceService } from '../../service/balance.service';

@Component({
  selector: 'assoc-funds-current-balance',
  templateUrl: './funds-current-balance.component.html'
})
export class FundsCurrentBalanceComponent implements OnInit {

  public readingBalance = false;

  public balance = new CurrentBalance();

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
