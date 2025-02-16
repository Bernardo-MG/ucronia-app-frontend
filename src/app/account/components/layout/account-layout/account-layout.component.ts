import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountLayoutService } from '@app/account/services/account-layout.service';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { Menu } from '@bernardo-mg/layout';

@Component({
    selector: 'account-layout',
    imports: [RouterModule, SidebarLayoutComponent],
    templateUrl: './account-layout.component.html'
})
export class AccountLayoutComponent implements OnInit {

  public menus: Menu[] = [];

  constructor(
    private accountLayoutService: AccountLayoutService
  ) { }

  public ngOnInit(): void {
    // Load menu
    this.menus = this.accountLayoutService.getMenus();
  }

}
