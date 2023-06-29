import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from '@app/shared/menu/menu.module';
import { MenusModule } from '../menus/menus.module';
import { CenteredLayoutComponent } from './components/centered-layout/centered-layout.component';
import { HeaderBodyComponent } from './components/header-body/header-body.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';



@NgModule({
  declarations: [
    HeaderBodyComponent,
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
    HeaderBodyComponent,
    CenteredLayoutComponent,
    MainLayoutComponent
  ]
})
export class LayoutModule { }
