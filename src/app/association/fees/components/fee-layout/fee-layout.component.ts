import { Component } from '@angular/core';
import { Menu } from '@app/shared/menu/models/menu';

@Component({
  selector: 'app-fee-layout',
  templateUrl: './fee-layout.component.html',
  styleUrls: ['./fee-layout.component.sass']
})
export class FeeLayoutComponent {

  public menus: Menu[] = [
    new Menu(
      [
        { title: 'Calendar', path: '/fees/calendar' },
        { title: 'List', path: '/fees/list' }
      ]
    )
  ];

}
