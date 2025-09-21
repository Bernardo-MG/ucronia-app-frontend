import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'account-layout',
  imports: [RouterModule, MenuModule],
  templateUrl: './account-layout.html'
})
export class AccountLayout {

  public readonly menus: MenuItem[];

  constructor() {
    const items = [];
    items.push(
      {
        label: 'Perfil',
        routerLink: '/account/profile',
        icon: 'pi pi-user'
      });
    items.push(
      {
        label: 'Contraseña',
        routerLink: '/account/password',
        icon: 'pi pi-user'
      });
    this.menus =
      [
        {
          label: 'Seguridad',
          items: items
        }
      ]
  }

}
