import { Component, OnInit } from '@angular/core';
import { Balance } from '@app/association/models/balance';
import { AssociationStatsService } from '../../services/association-stats.service';

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
    private service: AssociationStatsService
  ) { }

  ngOnInit(): void {
    this.waiting = true;
    this.service.getBalance().subscribe(d => {
      this.balance = d;
      this.waiting = false;
    });
  }

}
