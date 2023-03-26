import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { ComponentsModule } from '@app/components/components.module';
import { ControlsModule } from '@app/controls/controls.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
    AssociationLayoutComponent
  ],
  imports: [
    CommonModule,
    ControlsModule,
    ApiUiModule,
    NavigationModule,
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
