import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'assoc-settings-layout',
  imports: [RouterModule, PanelMenuModule],
  templateUrl: './settings-layout.html'
})
export class SettingsLayout {

  public menuItems: MenuItem[] = [
    {
      label: 'Propiedades',
      icon: 'pi pi-sliders-h',
      routerLink: 'properties'
    }
  ];

}
