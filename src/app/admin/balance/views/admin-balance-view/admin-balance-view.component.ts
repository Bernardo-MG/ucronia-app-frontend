import { Component, OnInit } from '@angular/core';
import { Balance } from '@app/models/balance';
import { AdminBalanceService } from '../../services/admin-balance.service';

@Component({
  selector: 'app-admin-balance-view',
  templateUrl: './admin-balance-view.component.html',
  styleUrls: ['./admin-balance-view.component.sass']
})
export class AdminBalanceViewComponent implements OnInit {

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
