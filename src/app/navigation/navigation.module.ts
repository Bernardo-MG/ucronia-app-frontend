import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AccountModule } from '@app/account/account.module';
import { NavigationDropdownComponent } from './navigation-dropdown/navigation-dropdown.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { NavigationSideMenuComponent } from './navigation-side-menu/navigation-side-menu.component';

@NgModule({
  declarations: [
    NavigationMenuComponent,
    NavigationDropdownComponent,
    NavigationSideMenuComponent
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
