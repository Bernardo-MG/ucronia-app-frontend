import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-transaction-tabs',
  templateUrl: './transaction-tabs.component.html',
  styleUrls: ['./transaction-tabs.component.sass']
})
export class TransactionTabsComponent {

  constructor() { }

  @Input() public calendarActive = false;

  @Input() public listActive = false;

}
