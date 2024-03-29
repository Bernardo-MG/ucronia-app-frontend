import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from '@app/shared/menu/models/menu';
import { LayoutService } from '../../services/layout.service';
import { HeaderNavigationWrapperComponent } from '../header-navigation-wrapper/header-navigation-wrapper.component';

@Component({
  selector: 'layout-main',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderNavigationWrapperComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass']
})
export class MainLayoutComponent implements OnInit {

  public menus: Menu[] = [];

  constructor(
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.menus = this.layoutService.getMenus();
  }

}
