import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from '@app/shared/menu/menu.module';
import { AccountMenuComponent } from './components/account-dropdown/account-dropdown.component';
import { CenteredLayoutComponent } from './components/centered-layout/centered-layout.component';
import { NavbarBodyComponent } from './components/navbar-body/navbar-body.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IconsModule } from '@app/shared/icons/icons.module';



@NgModule({
  declarations: [
    NavbarComponent,
    NavbarBodyComponent,
    CenteredLayoutComponent,
    MainLayoutComponent,
    AccountMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    IconsModule
  ],
  exports: [
    NavbarBodyComponent,
    CenteredLayoutComponent,
    MainLayoutComponent
  ]
})
export class LayoutModule { }
