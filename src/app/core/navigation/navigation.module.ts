import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountMenuComponent } from './components/account-menu-options/account-menu-options.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    AccountMenuComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavigationModule { }
