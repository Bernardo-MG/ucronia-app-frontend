import { Component } from '@angular/core';
import { Menu } from '@app/shared/menu/models/menu';

@Component({
  selector: 'app-transaction-layout',
  templateUrl: './transaction-layout.component.html',
  styleUrls: ['./transaction-layout.component.sass']
})
export class TransactionLayoutComponent {

  public menus: Menu[] = [
    {
      title: 'Account', links: [
        { title: 'Calendar', path: '/transactions/calendar' },
        { title: 'List', path: '/transactions/list' }
      ]
    }
  ];

}
