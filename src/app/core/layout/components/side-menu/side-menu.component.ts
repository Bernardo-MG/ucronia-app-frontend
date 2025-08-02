import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'layout-side-menu',
  imports: [CommonModule, RouterModule, MenuModule],
  templateUrl: './side-menu.component.html'
})
export class SideMenuComponent {

  public readonly menus = input<MenuItem[]>([]);

}
