import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '@app/core/layout/components/side/side-menu/side-menu.component';
import { LayoutService } from '@app/core/layout/services/layout.service';
import { PublicNavbarComponent } from '@app/frontpage/components/layout/public-navbar/public-navbar.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterModule, PublicNavbarComponent, SideMenuComponent],
  templateUrl: './public-layout.component.html'
})
export class PublicLayoutComponent {

  public title = '';

  constructor(
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    // App title
    this.title = this.layoutService.getTitle();
  }

}
