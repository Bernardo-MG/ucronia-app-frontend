import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@app/shared/icons/icons.module';
import { Menu } from '@app/shared/menu/models/menu';

@Component({
    selector: 'layout-side-menu',
    imports: [CommonModule, RouterModule, IconsModule],
    templateUrl: './side-menu.component.html',
    styleUrl: './side-menu.component.sass'
})
export class SideMenuComponent {

  @Input() public menus: Menu[] = [];

}
