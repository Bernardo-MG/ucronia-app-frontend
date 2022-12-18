import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountModule } from '@app/account/account.module';
import { NavigationDropdownComponent } from './navigation-dropdown/navigation-dropdown.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { NavigationSideMenuOptionsComponent } from './navigation-side-menu-options/navigation-side-menu-options.component';

@NgModule({
  declarations: [
    NavigationMenuComponent,
    NavigationDropdownComponent,
    NavigationSideMenuOptionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccountModule
  ],
  exports: [
    NavigationMenuComponent,
    NavigationSideMenuOptionsComponent
  ]
})
export class NavigationModule { }
