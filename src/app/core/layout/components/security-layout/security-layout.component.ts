import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { Menu } from '@bernardo-mg/layout';
import { SecurityLayoutService } from '../../services/security-layout.service';

@Component({
    selector: 'access-sidebar',
    imports: [RouterModule, SidebarLayoutComponent],
    templateUrl: './security-layout.component.html'
})
export class SecurityLayoutComponent implements OnInit {

  public menus: Menu[] = [];

  constructor(
    private securityLayoutService: SecurityLayoutService
  ) { }

  ngOnInit(): void {
    // Load menus
    this.menus = this.securityLayoutService.getMenus();
  }

}
