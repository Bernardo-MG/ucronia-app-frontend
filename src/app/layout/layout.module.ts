import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { ComponentsModule } from '@app/components/components.module';
import { ControlsModule } from '@app/controls/controls.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountMenuComponent } from './components/account-menu-options/account-menu-options.component';
import { HeaderLayoutComponent } from './components/header-layout/header-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DataFormComponent } from './data-form/data-form.component';
import { DataListComponent } from './data-list/data-list.component';
import { AssociationLayoutComponent } from './views/association-layout/association-layout.component';

@NgModule({
  declarations: [
    DataListComponent,
    DataFormComponent,
    HeaderLayoutComponent,
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
    ComponentsModule
  ],
  exports: [
    DataListComponent,
    DataFormComponent,
    HeaderLayoutComponent
  ]
})
export class LayoutModule { }
