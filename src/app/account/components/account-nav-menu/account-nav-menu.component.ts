import { Component } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'account-nav-menu',
  templateUrl: './account-nav-menu.component.html',
  styleUrls: ['./account-nav-menu.component.sass']
})
export class AccountNavMenuComponent {

  public accountIcon = faCircleUser;

  constructor() { }

}
