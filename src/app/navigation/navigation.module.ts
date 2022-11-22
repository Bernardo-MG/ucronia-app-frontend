import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AccountModule } from '@app/account/account.module';
import { NavigationDropdownComponent } from './navigation-dropdown/navigation-dropdown.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { NavigationSideMenuComponent } from './navigation-side-menu/navigation-side-menu.component';
import { NavigationSideMenuWrapperComponent } from './navigation-side-menu-wrapper/navigation-side-menu-wrapper.component';

@NgModule({
  declarations: [
    NavigationMenuComponent,
    NavigationDropdownComponent,
    NavigationSideMenuComponent,
    NavigationSideMenuWrapperComponent
  ],
  imports: [
    CommonModule,
    NoopAnimationsModule,
    RouterModule,
    AccountModule
  ],
  exports: [
    NavigationMenuComponent,
    NavigationSideMenuComponent
  ]
})
export class NavigationModule { }
