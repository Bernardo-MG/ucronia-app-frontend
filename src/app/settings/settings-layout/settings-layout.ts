import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';

interface MenuSection {
  label: string;
  items: MenuItem[];
}

@Component({
  selector: 'assoc-settings-layout',
  imports: [
    RouterModule,
    CardModule,
    RippleModule
  ],
  templateUrl: './settings-layout.html',
  styleUrl: './settings-layout.scss'
})
export class SettingsLayout {

  protected readonly menuSections: MenuSection[];

  constructor() {
    const authService = inject(AuthService);

    const catalogItems: MenuItem[] = [];

    if (authService.hasPermission(UcroniaPermissions.feeType.read)) {
      catalogItems.push({
        label: 'Tipos de cuota',
        icon: 'pi pi-money-bill',
        routerLink: 'fee-types'
      });
    }

    if (
      authService.hasPermission(
        UcroniaPermissions.directory.memberProfile.read
      )
    ) {
      catalogItems.push({
        label: 'Llaves',
        icon: 'pi pi-key',
        routerLink: 'keys'
      });
    }

    if (
      authService.hasPermission(
        UcroniaPermissions.directory.contactMethod.read
      )
    ) {
      catalogItems.push({
        label: 'Métodos de contacto',
        icon: 'pi pi-phone',
        routerLink: 'contact-methods'
      });
    }

    this.menuSections = [
      {
        label: 'Configuración',
        items: [
          {
            label: 'Propiedades',
            icon: 'pi pi-sliders-h',
            routerLink: 'properties'
          }
        ]
      },
      ...(catalogItems.length > 0
        ? [{
            label: 'Catálogos',
            items: catalogItems
          }]
        : [])
    ];
  }
}