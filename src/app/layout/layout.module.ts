import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { ControlsModule } from '@app/controls/controls.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataFormComponent } from './data-form/data-form.component';
import { DataListComponent } from './data-list/data-list.component';
import { SideMenuLayoutComponent } from './side-menu-layout/side-menu-layout.component';

@NgModule({
  declarations: [
    DataListComponent,
    SideMenuLayoutComponent,
    DataFormComponent
  ],
  imports: [
    CommonModule,
    ControlsModule,
    ApiUiModule,
    NavigationModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    DataListComponent,
    SideMenuLayoutComponent
  ]
})
export class LayoutModule { }
