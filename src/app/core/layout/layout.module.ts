import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@app/shared/icons/icons.module';
import { MenuModule } from '@app/shared/menu/menu.module';
import { AccountMenuComponent } from './components/account-dropdown/account-dropdown.component';
import { CenteredFrameComponent } from './components/centered-frame/centered-frame.component';
import { NavbarBodyComponent } from './components/navbar-body/navbar-body.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    NavbarBodyComponent,
    CenteredFrameComponent,
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
    CenteredFrameComponent
  ]
})
export class LayoutModule { }
