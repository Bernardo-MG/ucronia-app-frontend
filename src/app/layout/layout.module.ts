import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { ComponentsModule } from '@app/components/components.module';
import { ControlsModule } from '@app/controls/controls.module';
import { LoginModule } from '@app/security/login/login.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountMenuComponent } from './components/account-menu-options/account-menu-options.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DataFormComponent } from './data-form/data-form.component';
import { DataListComponent } from './data-list/data-list.component';
import { AssociationLayoutComponent } from './views/association-layout/association-layout.component';

@NgModule({
  declarations: [
    DataListComponent,
    DataFormComponent,
    NavbarComponent,
    AssociationLayoutComponent,
    AccountMenuComponent
  ],
  imports: [
    CommonModule,
    ControlsModule,
    ApiUiModule,
    RouterModule,
    FontAwesomeModule,
    ComponentsModule,
    LoginModule
  ],
  exports: [
    DataListComponent,
    DataFormComponent
  ]
})
export class LayoutModule { }
