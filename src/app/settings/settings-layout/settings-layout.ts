import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'assoc-settings-layout',
  imports: [RouterModule, PanelMenuModule],
  templateUrl: './settings-layout.html'
})
export class SettingsLayout {

  public menuItems: MenuItem[] = [];

  constructor() {
    const authService = inject(AuthService);

    const items: MenuItem[] = [
      {
        label: 'Propiedades',
        icon: 'pi pi-sliders-h',
        routerLink: 'properties'
      }
    ];

    if (authService.hasPermission(UcroniaPermissions.feeType.read)) {
      items.push({
        label: 'Tipos de cuota',
        icon: 'pi pi-money-bill',
        routerLink: 'fee-types'
      });
    }

    if (authService.hasPermission(UcroniaPermissions.directory.memberProfile.read)) {
      items.push({
        label: 'Llaves',
        icon: 'pi pi-key',
        routerLink: 'keys'
      });
    }

    if (authService.hasPermission(UcroniaPermissions.directory.contactMethod.read)) {
      items.push({
        label: 'Métodos de contacto',
        icon: 'pi pi-phone',
        routerLink: 'contact-methods'
      });
    }

    this.menuItems = items;
  }

}
