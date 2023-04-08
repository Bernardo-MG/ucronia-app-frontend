import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { DataFormComponent } from './components/data-form/data-form.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { FormControlsComponent } from './components/form-controls/form-controls.component';
import { MainFrameComponent } from './components/main-frame/main-frame.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WaitingWrapperComponent } from './components/waiting-wrapper/waiting-wrapper.component';
import { AccountFrameComponent } from './containers/account-frame/account-frame.component';
import { AccountMenuComponent } from './containers/account-menu/account-menu.component';
import { HeaderFrameComponent } from './containers/header-frame/header-frame.component';
import { MenuModule } from '@app/shared/menu/menu.module';


@NgModule({
  declarations: [
    DataFormComponent,
    DataListComponent,
    FormControlsComponent,
    MainFrameComponent,
    AccountMenuComponent,
    NavbarComponent,
    AccountFrameComponent,
    HeaderFrameComponent,
    WaitingWrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IconsModule,
    PaginationModule,
    AuthenticationModule,
    MenuModule
  ],
  exports: [
    DataFormComponent,
    DataListComponent,
    FormControlsComponent,
    MainFrameComponent,
    NavbarComponent,
    WaitingWrapperComponent
  ],
})
export class LayoutModule { }
