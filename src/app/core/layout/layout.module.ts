import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataFormComponent } from './components/data-form/data-form.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { FormControlsComponent } from './components/form-controls/form-controls.component';
import { MenuComponent } from './components/menu/menu.component';
import { AssociationLayoutComponent } from './containers/association-layout/association-layout.component';



@NgModule({
  declarations: [
    DataFormComponent,
    DataListComponent,
    FormControlsComponent,
    MenuComponent,
    AssociationLayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DataFormComponent,
    DataListComponent,
    FormControlsComponent,
    AssociationLayoutComponent
  ],
})
export class LayoutModule { }
