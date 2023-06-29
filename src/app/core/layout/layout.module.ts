import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from '@app/shared/menu/menu.module';
import { AccountMenuComponent } from './components/account-dropdown/account-dropdown.component';
import { CenteredFrameComponent } from './components/centered-frame/centered-frame.component';
import { NavbarBodyComponent } from './components/navbar-body/navbar-body.component';
import { SidenavFrameComponent } from './components/sidenav-frame/sidenav-frame.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IconsModule } from '@app/shared/icons/icons.module';



@NgModule({
  declarations: [
    NavbarComponent,
    NavbarBodyComponent,
    CenteredFrameComponent,
    SidenavFrameComponent,
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
    CenteredFrameComponent,
    SidenavFrameComponent
  ]
})
export class LayoutModule { }
