import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from '@app/shared/menu/menu.module';
import { CenteredLayoutComponent } from './containers/centered-layout/centered-layout.component';
import { HeaderLayoutComponent } from './containers/header-layout/header-layout.component';
import { MainLayoutComponent } from './containers/main-layout/main-layout.component';
import { MenusModule } from '../menus/menus.module';



@NgModule({
  declarations: [
    HeaderLayoutComponent,
    CenteredLayoutComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    MenusModule
  ],
  exports: [
    HeaderLayoutComponent,
    CenteredLayoutComponent,
    MainLayoutComponent
  ]
})
export class LayoutModule { }
