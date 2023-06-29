import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { Menu } from '@app/shared/menu/models/menu';

@Component({
  selector: 'layout-sidenav-frame',
  templateUrl: './sidenav-frame.component.html'
})
export class SidenavFrameComponent implements OnInit {

  public title = '';

  public sideMenu: Menu[] = [];

  constructor(
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.sideMenu = this.layoutService.getMainMenu();
    this.title = this.layoutService.getTitle();
  }

}
