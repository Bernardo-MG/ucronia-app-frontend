import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginModule } from '@app/security/login/login.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationAccountMenuComponent } from './navigation-account-menu-options/navigation-account-menu-options.component';
import { NavigationDropdownComponent } from './navigation-dropdown/navigation-dropdown.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { NavigationSideMenuOptionsComponent } from './navigation-side-menu-options/navigation-side-menu-options.component';

@NgModule({
  declarations: [
    NavigationAccountMenuComponent,
    NavigationMenuComponent,
    NavigationDropdownComponent,
    NavigationSideMenuOptionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    LoginModule
  ],
  exports: [
    NavigationMenuComponent,
    NavigationSideMenuOptionsComponent
  ]
})
export class NavigationModule { }
