import { Component, OnInit } from '@angular/core';
import { Balance } from '@app/association/models/balance';
import { BalanceService } from '../../services/balance.service';

@Component({
  selector: 'assoc-balance-info',
  templateUrl: './balance-info.component.html'
})
export class BalanceInfoComponent implements OnInit {

  /**
   * Waiting flag.
   */
  public waiting = false;

  public balance: Balance = new Balance();

  constructor(
    private service: BalanceService
  ) { }

  ngOnInit(): void {
    this.waiting = true;
    this.service.getBalance().subscribe(d => {
      this.balance = d;
      this.waiting = false;
    });
  }

}
