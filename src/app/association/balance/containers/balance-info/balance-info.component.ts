import { Component, OnInit } from '@angular/core';
import { Balance } from '@app/association/models/balance';
import { BalanceService } from '../../services/balance.service';

@Component({
  selector: 'assoc-balance-info',
  templateUrl: './balance-info.component.html',
  styleUrls: ['./balance-info.component.sass']
})
export class BalanceInfoComponent implements OnInit {

  public balance: Balance = new Balance();

  constructor(
    private service: BalanceService
  ) {}

  ngOnInit(): void {
    this.service.getBalance().subscribe(d => {
      this.balance = d;
    });
  }

}
