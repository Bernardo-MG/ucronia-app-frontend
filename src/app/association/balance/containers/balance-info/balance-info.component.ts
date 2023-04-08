import { Component, OnInit } from '@angular/core';
import { Balance } from '@app/association/models/balance';
import { AdminBalanceService } from '../../services/admin-balance.service';

@Component({
  selector: 'admin-balance-info',
  templateUrl: './balance-info.component.html',
  styleUrls: ['./balance-info.component.sass']
})
export class BalanceInfoComponent implements OnInit {

  public balance: Balance = new Balance();

  constructor(
    private service: AdminBalanceService
  ) {}

  ngOnInit(): void {
    this.service.getBalance().subscribe(d => {
      this.balance = d;
    });
  }

}
